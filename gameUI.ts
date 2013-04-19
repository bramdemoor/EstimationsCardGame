///<reference path="knockout.d.ts" />
///<reference path="game.ts" />

module Bdm.Estimations.UI {

    export class PlayerViewModel {
        name: KnockoutObservableString;

        constructor(player: Bdm.Estimations.Player) {
            this.name = ko.observable(player.name);
        }
    }

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

        players: KnockoutObservableArray;

        someCard: CardViewModel = new CardViewModel(Suits.Hearts, Ranks.Ace);

        constructor() {

        }

        startGame() {
            this.game = new Game();

            this.players = ko.observableArray(ko.utils.arrayMap(this.game.players, (p: Bdm.Estimations.Player) => { return new PlayerViewModel(p); }));

            ko.applyBindings(this);

        }

        nextTurn() {
            console.log('next turn.');
        }
    }
}