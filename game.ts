module Bdm.Estimations {

    class Suit {
        static Hearts: Suit = new Suit("Hearts");
        static Diamonds: Suit = new Suit("Diamonds");
        static Clubs: Suit = new Suit("Clubs");
        static Spades: Suit = new Suit("Spades");

        constructor(public name: string) {}
    }

    class Rank {

    }

    //enum Ranks { Ace = 1, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King  }

    class Card {
        constructor(public suit: Suit) {}

        toString() { return this.suit.name; }
    }

    export class Game {
        constructor() {
            var myCard = new Card(Suit.Clubs);

            console.log('Card: ' + myCard.toString());
        }
    }
}

new Bdm.Estimations.Game();