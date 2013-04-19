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

        doTurn() { this.game.stack.putCard(this, this.hand.pop()); }

        hasCards() { return this.hand.length > 0; }
    }

    export enum Suits { Hearts = 1, Diamonds, Clubs, Spades }
    export enum Ranks { Ace = 1, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }

    export class Card {
        constructor(public suit: Suits, public rank: Ranks) {}

        getValueHash() { return this.suit * 10 + this.rank; }

        static compare(a: Card, b: Card) { return a.getValueHash() - b.getValueHash(); }
    }

    export class Deck {
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
            var playerIndex = 0;
            while(this.cards.length > 0) players[playerIndex++ % players.length].giveCard(this.cards.pop());

        }
    }

    export class Game {
        stack: CurrentStack;

        constructor() {
            var players = [ new Player("Bram", this), new Player("Player2", this), new Player("Player3", this), new Player("Player4", this) ];

            var roundCounter = 0;
            var roundsLeft = true;

            while(roundsLeft) {
                console.log('Dealing for roundje ' + (roundCounter + 1));

                var cardsToRemoveCount = roundCounter++ * players.length;

                if(cardsToRemoveCount >= 52) {
                    roundsLeft = false;
                    break;
                }

                var myDeck = new Deck(cardsToRemoveCount);

                this.stack = new CurrentStack();

                var playing = true;
                var currentPlayerIndex = 0;

                var estimates = [];

                myDeck.dealTo(players);

                players.forEach((p: Player) => { estimates.push(p.getEstimate()); } );

                while(playing) {

                    var player = players[currentPlayerIndex++ % players.length];

                    if(!player.hasCards()) {
                        playing = false;
                        break;
                    }

                    if(this.stack.isFull()) {
                        var highest = this.stack.finalize();
                        console.log('highest card was from ' + highest);
                    }

                    player.doTurn();
                }
            }
        }
    }
}