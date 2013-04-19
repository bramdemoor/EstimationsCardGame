module Bdm.Estimations {
    export enum Suits { Hearts, Diamonds, Clubs, Spades }
    export enum Ranks { Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King  }

    export class Game {
        constructor() {
            console.log('hello world!');
        }
    }
}

new Bdm.Estimations.Game();