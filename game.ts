module Bdm.Estimations {

    class Suit {
        static Hearts: Suit = new Suit("Hearts", 1);
        static Diamonds: Suit = new Suit("Diamonds", 2);
        static Clubs: Suit = new Suit("Clubs", 3);
        static Spades: Suit = new Suit("Spades", 4);

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

        constructor(public name: string, public value: number) {}
    }

    class Card {
        constructor(public suit: Suit, public rank: Rank) {}

        toString() { return this.rank.name + ' of ' + this.suit.name; }
    }

    export class Game {
        constructor() {
            var myCard = new Card(Suit.Clubs, Rank.King);

            console.log('Card: ' + myCard.toString());
        }
    }
}

new Bdm.Estimations.Game();