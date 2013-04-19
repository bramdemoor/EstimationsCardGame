///<reference path="knockout.d.ts" />
///<reference path="game.ts" />

module Bdm.Estimations.UI {
    export class GamePage {
        game: Bdm.Estimations.Game;

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