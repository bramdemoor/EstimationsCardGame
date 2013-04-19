module Bdm.Estimations {

    class CurrentStack {
        cards: Card[] = new Card[];

        putCard(player: Player, card: Card) {
            this.cards.push(card);
        }

        sort() {
            this.cards.sort(Card.compare);
        }
    }

    class Player {
        hand: Card[] = new Card[];

        constructor(public name: string, private game: Game) {}

        giveCard(card: Card) { this.hand.push(card); }

        getEstimate() { return { name: name, estimate: Math.floor(this.hand.length / 4) }; }

        doTurn() { this.game.stack.putCard(this, this.hand.pop()); }

        hasCards() { return this.hand.length > 0; }
    }

    class Suit {
        static Hearts: Suit = new Suit("Hearts", 1);
        static Diamonds: Suit = new Suit("Diamonds", 2);
        static Clubs: Suit = new Suit("Clubs", 3);
        static Spades: Suit = new Suit("Spades", 4);

        static All: Suit[] = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades];

        constructor(public name: string, public value: number) {}
    }

    class Rank {

        static Ace: Rank = new Rank("Ace", 1);
        static Two: Rank = new Rank("Two", 2);
        static Three: Rank = new Rank("Three", 3);
        static Four: Rank = new Rank("Four", 4);
        static Five: Rank = new Rank("Five", 5);
        static Six: Rank = new Rank("Six", 6);
        static Seven: Rank = new Rank("Seven", 7);
        static Eight: Rank = new Rank("Eight", 8);
        static Nine: Rank = new Rank("Nine", 9);
        static Ten: Rank = new Rank("Ten", 10);
        static Jack: Rank = new Rank("Jack", 11);
        static Queen: Rank = new Rank("Queen", 12);
        static King: Rank = new Rank("King", 13);

        static All: Rank[] = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];

        constructor(public name: string, public value: number) {}
    }

    class Card {
        constructor(public suit: Suit, public rank: Rank) {}

        toString() { return this.rank.name + ' of ' + this.suit.name; }

        getValueHash() { return this.suit.value * 10 + this.rank.value; }

        static compare(a: Card, b: Card) { return a.getValueHash() - b.getValueHash(); }

        //function(a,b) { return parseFloat(a.price) - parseFloat(b.price) }
    }

    class Deck {
        cards: Card[] = new Card[]();

        constructor() {
            for(var n = 0; n<13; n++) {
                this.cards.push(new Card(Suit.All[0], Rank.All[n]));
                this.cards.push(new Card(Suit.All[1], Rank.All[n]));
                this.cards.push(new Card(Suit.All[2], Rank.All[n]));
                this.cards.push(new Card(Suit.All[3], Rank.All[n]));
            }

            this.shuffle();
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
            var myDeck = new Deck();

            this.stack = new CurrentStack();

            var playing = true;
            var currentPlayerIndex = 0;

            //var trump = Suit.Spades;

            var estimates = [];
            var players = [ new Player("Bram", this), new Player("Player2", this), new Player("Player3", this), new Player("Player4", this) ];

            myDeck.dealTo(players);

            players.forEach((p: Player) => { estimates.push(p.getEstimate()); } );

            while(playing) {

                var player = players[currentPlayerIndex++ % players.length];

                if(!player.hasCards()) {
                    playing = false;
                    break;
                }

                if(this.stack.cards.length == 4) {
                    this.stack.sort();
                    this.stack.cards = [];
                    console.log('stack was full');
                }

                player.doTurn();
            }
        }
    }
}

new Bdm.Estimations.Game();