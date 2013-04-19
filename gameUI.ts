///<reference path="knockout.d.ts" />
///<reference path="game.ts" />

module Bdm.Estimations.UI {

    export class CardViewModel {
        private suitNames = ["Hearts", "Diamonds", "Clubs", "Spades"];
        private rankNames = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

        friendlyName: KnockoutComputed;

        constructor(public suit: Bdm.Estimations.Suits, public rank: Bdm.Estimations.Ranks) {
            this.friendlyName = ko.computed(() => {
                return this.rankNames[rank-1] + ' of ' + this.suitNames[suit-1];
            });
        }
    }

    export class PlayerViewModel {
        name: KnockoutObservableString;
        cards: KnockoutObservableArray;

        constructor(player: Bdm.Estimations.Player) {
            this.name = ko.observable(player.name);
            this.cards = ko.observableArray(ko.utils.arrayMap(player.hand, (c) => {
                return new CardViewModel(c.suit, c.rank);
            }))
        }
    }

    export class GamePage {
        game: Bdm.Estimations.Game;
        players: KnockoutObservableArray;

        constructor() {
        }

        startGame() {
            this.game = new Game();

            this.players = ko.observableArray(ko.utils.arrayMap(this.game.players, (p: Bdm.Estimations.Player) => { return new PlayerViewModel(p); }));

            ko.applyBindings(this);

            console.log(this.game);
        }

        nextTurn() {
            console.log('next turn.');
        }
    }
}