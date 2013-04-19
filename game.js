var Bdm;
(function (Bdm) {
    (function (Estimations) {
        (function (Suits) {
            Suits._map = [];
            Suits._map[0] = "Hearts";
            Suits.Hearts = 0;
            Suits._map[1] = "Diamonds";
            Suits.Diamonds = 1;
            Suits._map[2] = "Clubs";
            Suits.Clubs = 2;
            Suits._map[3] = "Spades";
            Suits.Spades = 3;
        })(Estimations.Suits || (Estimations.Suits = {}));
        var Suits = Estimations.Suits;
        (function (Ranks) {
            Ranks._map = [];
            Ranks._map[0] = "Ace";
            Ranks.Ace = 0;
            Ranks._map[1] = "Two";
            Ranks.Two = 1;
            Ranks._map[2] = "Three";
            Ranks.Three = 2;
            Ranks._map[3] = "Four";
            Ranks.Four = 3;
            Ranks._map[4] = "Five";
            Ranks.Five = 4;
            Ranks._map[5] = "Six";
            Ranks.Six = 5;
            Ranks._map[6] = "Seven";
            Ranks.Seven = 6;
            Ranks._map[7] = "Eight";
            Ranks.Eight = 7;
            Ranks._map[8] = "Nine";
            Ranks.Nine = 8;
            Ranks._map[9] = "Ten";
            Ranks.Ten = 9;
            Ranks._map[10] = "Jack";
            Ranks.Jack = 10;
            Ranks._map[11] = "Queen";
            Ranks.Queen = 11;
            Ranks._map[12] = "King";
            Ranks.King = 12;
        })(Estimations.Ranks || (Estimations.Ranks = {}));
        var Ranks = Estimations.Ranks;
        var Game = (function () {
            function Game() {
                console.log('hello world!');
            }
            return Game;
        })();
        Estimations.Game = Game;        
    })(Bdm.Estimations || (Bdm.Estimations = {}));
    var Estimations = Bdm.Estimations;
})(Bdm || (Bdm = {}));
new Bdm.Estimations.Game();
//@ sourceMappingURL=game.js.map
