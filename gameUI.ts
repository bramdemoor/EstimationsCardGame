///<reference path="knockout.d.ts" />
///<reference path="game.ts" />

module Bdm.Estimations.UI {

    export class CardViewModel {
        private suitNames = ["Hearts", "Diamonds", "Clubs", "Spades"];
        private rankNames = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

        friendlyName: KnockoutComputed;

        constructor(public suit: Bdm.Estimations.Suits, public rank: Bdm.Estimations.Ranks) {

            this.friendlyName = ko.computed(() => {
                return this.rankNames[rank-1] + ' of ' + this.suitNames[suit-1]; });

        }
    }

    export class GamePage {
        game: Bdm.Estimations.Game;

        someCard: CardViewModel = new CardViewModel(Suits.Hearts, Ranks.Ace);

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