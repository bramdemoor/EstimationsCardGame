module Bdm.Estimations {

    export class CurrentStack {
        turns: any[] = new any[];

        putCard(player: Player, card: Card) { this.turns.push({ player : player, card : card}); }

        private sort() { this.turns.sort((a,b) => { return Card.compare(a.card, b.card); }); }

        isFull() { return this.turns.length == 4; }

        finalize() {
            this.sort();
            var obj = this.turns[3].player.name;
            this.turns = [];
            return obj;
        }
    }

    export class Player {
        hand: Card[] = new Card[];

        constructor(public name: string, private game: Game) {}

        giveCard(card: Card) { this.hand.push(card); }

        getEstimate() { return { name: name, estimate: Math.floor(this.hand.length / 4) }; }

        doTurn() { this.game.currentRound.stack.putCard(this, this.hand.pop()); }

        hasCards() { return this.hand.length > 0; }
    }

    export enum Suits { Hearts = 1, Diamonds, Clubs, Spades }
    export enum Ranks { Ace = 1, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }

    export class Card {
        constructor(public suit: Suits, public rank: Ranks) {}

        static compare(a: Card, b: Card) { return (a.suit * 10 + a.rank) - (b.suit * 10 + b.rank); }
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
            for(var j, x, i = this.cards.length; i; j = parseInt(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x) {}
        }

        dealTo(players: Player[]) {
            var playerIndex = 0; while(this.cards.length > 0) players[playerIndex++ % players.length].giveCard(this.cards.pop());
        }
    }

    export class Round {
        stack: CurrentStack;
        deck: Deck;
        estimates: any[] = new any[];

        constructor(roundNumber: number, private game: Game) {
            this.deck = new Deck(roundNumber * game.players.length);
            this.stack = new CurrentStack();
        }

        play() {
            var currentPlayerIndex = 0;
            this.deck.dealTo(this.game.players);
            this.game.players.forEach((p: Player) => { this.estimates.push(p.getEstimate()); } );
            while(true) {

                var player = this.game.players[currentPlayerIndex++ % this.game.players.length];

                if(!player.hasCards()) { break; }

                if(this.stack.isFull()) {
                    var highest = this.stack.finalize();
                    console.log('highest card was from ' + highest);
                }

                player.doTurn();
            }
        }
    }

    export class Game {
        players: Player[];
        rounds: Round[] = new Round[];
        currentRound: Round;

        constructor() {
            this.players = [ new Player("Bram", this), new Player("Player2", this), new Player("Player3", this), new Player("Player4", this) ];

            var maxRounds = Math.floor(Deck.MAX_CARDS / this.players.length);

            while(true) {
                if(this.rounds.length == maxRounds) break;

                this.currentRound = new Round(this.rounds.length + 1, this);

                this.currentRound.play();

                this.rounds.push(this.currentRound);
            }
        }
    }
}