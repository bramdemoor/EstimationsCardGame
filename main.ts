module Estimations {

    export enum Suits { Hearts = 1, Diamonds, Clubs, Spades }
    export enum Ranks { Ace = 1, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }

    export class Card {
        constructor(public suit: Suits, public rank: Ranks) {}

        static compare(a: Card, b: Card) { return (a.suit * 10 + a.rank) - (b.suit * 10 + b.rank); }
    }

    export class Player {
        hand: Card[] = new Card[];

        constructor(public name: string, private game: Game) {}

        giveCard(card: Card) { this.hand.push(card); }
        getEstimate(): Estimate { return new Estimate(this, Math.floor(this.hand.length / 4)); }
        takeCardToPut() { return this.hand.pop(); }
    }

    export class Deck {
        static MAX_CARDS: number = 52;

        cards: Card[] = new Card[]();

        constructor(cardsToRemoveCount: number = 0) {
            for(var n = 0; n<13; n++) for(var s=0; s<4; s++) this.cards.push(new Card(n+1, s+1));
            this.shuffle();
            this.cards.splice(0, cardsToRemoveCount);
        }

        shuffle() {
            // Array shuffle by  Jonas Raoni Soares Silva | http://jsfromhell.com/array/shuffle [v1.0]
            //for(var j, x, i = this.cards.length; i; j = parseInt(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x) {}
        }

        dealTo(players: Player[]) {
            var playerIndex = 0; while(this.cards.length > 0) players[playerIndex++ % players.length].giveCard(this.cards.pop());
        }
    }

    export class Estimate {
        constructor(public player: Player, public estimatedWins: number) {}
    }

    export class Turn {
        card: Card;

        constructor(public player: Player) { }

        play() {
            this.card = this.player.takeCardToPut();
        }
    }

    export class MiniRound {
        turns: Turn[] = new Turn[];

        constructor(public game: Game) {}

        play() {
            var currentPlayerIndex = 0;

            while(true) {
                if(this.turns.length == this.game.players.length) {
                    this.turns.sort((a,b) => { return Card.compare(a.card, b.card); });
                    console.log('highest card was from ' + this.turns[3].player.name);
                    break;
                } else {
                    var turn = new Turn(this.game.players[currentPlayerIndex++]);
                    turn.play();
                    this.turns.push(turn);
                }
            }
        }
    }

    export class Round {
        deck: Deck;
        estimates: Estimate[] = new Estimate[];
        minirounds: MiniRound[] = new MiniRound[];
        cardsToRemoveCount: number;

        constructor(roundNumber: number, private game: Game) {
            this.cardsToRemoveCount = roundNumber * game.players.length;
            this.deck = new Deck(this.cardsToRemoveCount);
        }

        play() {
            console.log('starting round...');

            this.deck.dealTo(this.game.players);
            this.game.players.forEach((p: Player) => { this.estimates.push(p.getEstimate()); } );

            var maxSlagen = Math.floor((Deck.MAX_CARDS - this.cardsToRemoveCount) / this.game.players.length);
            while(true) {
                if(this.minirounds.length == maxSlagen) break;
                var miniRound = new MiniRound(this.game);
                miniRound.play();
                this.minirounds.push(miniRound);
            }
        }
    }

    export class Game {
        players: Player[];
        rounds: Round[] = new Round[];
        currentRound: Round;

        constructor() {
            this.players = [ new Player("Bram", this), new Player("Player2", this), new Player("Player3", this), new Player("Player4", this) ];

            while(true) {
                if(this.rounds.length == Math.floor(Deck.MAX_CARDS / this.players.length)) break;
                this.currentRound = new Round(this.rounds.length + 1, this);
                this.currentRound.play();
                this.rounds.push(this.currentRound);
            }
        }
    }
}

var program = require('commander');

program
    .version('0.0.1');

var suitNames = ["Hearts", "Diamonds", "Clubs", "Spades"];
var rankNames = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

function getName(suit: Estimations.Suits, rank: Estimations.Ranks) {
    return rankNames[rank-1] + ' of ' + suitNames[suit-1]
}

console.log('Starting game... ♥♦♣♠');

var game = new Estimations.Game();

