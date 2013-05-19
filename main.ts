/// <reference path="node.ts" />
/// <reference path="commander.d.ts" />

module Estimations {
    export class Card {
        constructor(public rank: number, public suit: number) {}

        static compare(a: Card, b: Card) { return (a.suit * 10 + a.rank) - (b.suit * 10 + b.rank); }

        print() {
            if(this.suit == 1 || this.suit == 2) {
                process.stdout.write((<any>this.getSymbol()).red);
                process.stdout.write((<any>this.getValue()).red);
            } else {
                process.stdout.write((<any>this.getSymbol()).grey);
                process.stdout.write((<any>this.getValue()).grey);
            }
        }

        private getSymbol() : string {
            if(this.suit == 1) return '♥';
            if(this.suit == 2) return '♦';
            if(this.suit == 3) return '♣';
            if(this.suit == 4) return '♠';
            return '?';
        }

        private getValue() : string {
            if(this.rank == 11) return 'J';
            if(this.rank == 12) return 'Q';
            if(this.rank == 13) return 'K';
            return this.rank.toString();
        }
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
            this.cards.forEach(function(c) {
                c.print();
            });
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

        }

        start() {
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
var colors = require('colors');

program
    .version('0.0.1');

console.log('Starting game...');

var game: Estimations.Game = new Estimations.Game();
game.players = [
    new Estimations.Player("Bram", game),
    new Estimations.Player("Player2", game),
    new Estimations.Player("Player3", game),
    new Estimations.Player("Player4", game)
];
game.start();
