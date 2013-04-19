var Bdm;
(function (Bdm) {
    (function (Estimations) {
        var Suit = (function () {
            function Suit(name) {
                this.name = name;
            }
            Suit.Hearts = new Suit("Hearts");
            Suit.Diamonds = new Suit("Diamonds");
            Suit.Clubs = new Suit("Clubs");
            Suit.Spades = new Suit("Spades");
            return Suit;
        })();        
        var Rank = (function () {
            function Rank() { }
            return Rank;
        })();        
        var Card = (function () {
            function Card(suit) {
                this.suit = suit;
            }
            Card.prototype.toString = function () {
                return this.suit.name;
            };
            return Card;
        })();        
        var Game = (function () {
            function Game() {
                var myCard = new Card(Suit.Clubs);
                console.log('Card: ' + myCard.toString());
            }
            return Game;
        })();
        Estimations.Game = Game;        
    })(Bdm.Estimations || (Bdm.Estimations = {}));
    var Estimations = Bdm.Estimations;
})(Bdm || (Bdm = {}));
new Bdm.Estimations.Game();
//@ sourceMappingURL=game.js.map
