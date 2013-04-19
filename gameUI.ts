///<reference path="knockout.d.ts" />
///<reference path="game.ts" />

module Bdm.Estimations.UI {

    export class CardViewModel {
        private static suitNames = ["Hearts", "Diamonds", "Clubs", "Spades"];
        private static rankNames = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

        friendlyName: KnockoutComputed;

        constructor(public suit: Bdm.Estimations.Suit, public rank: Bdm.Estimations.Rank) {

            this.friendlyName = ko.computed(() => {return rank.name + ' of ' + suit.name; });

        }
    }

    export class GamePage {
        game: Bdm.Estimations.Game;

        someCard: CardViewModel = new CardViewModel(Suit.Hearts, Rank.Ace);

        constructor() {

        }

        startGame() {
            this.game = new Game();

            ko.applyBindings(this);
        }

        nextTurn() {
            console.log('next turn.');
        }
    }
}