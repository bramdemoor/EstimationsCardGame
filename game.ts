module Bdm.Estimations {

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
        }

    }

    export class Game {
        constructor() {
            var myDeck = new Deck();

            console.log(myDeck.cards);
        }
    }
}

new Bdm.Estimations.Game();