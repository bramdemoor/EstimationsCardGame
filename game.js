var Bdm;
(function (Bdm) {
    (function (Estimations) {
        var Suit = (function () {
            function Suit(name, value) {
                this.name = name;
                this.value = value;
            }
            Suit.Hearts = new Suit("Hearts", 1);
            Suit.Diamonds = new Suit("Diamonds", 2);
            Suit.Clubs = new Suit("Clubs", 3);
            Suit.Spades = new Suit("Spades", 4);
            Suit.All = [
                Suit.Hearts, 
                Suit.Diamonds, 
                Suit.Clubs, 
                Suit.Spades
            ];
            return Suit;
        })();        
        var Rank = (function () {
            function Rank(name, value) {
                this.name = name;
                this.value = value;
            }
            Rank.Ace = new Rank("Ace", 1);
            Rank.Two = new Rank("Two", 2);
            Rank.Three = new Rank("Three", 3);
            Rank.Four = new Rank("Four", 4);
            Rank.Five = new Rank("Five", 5);
            Rank.Six = new Rank("Six", 6);
            Rank.Seven = new Rank("Seven", 7);
            Rank.Eight = new Rank("Eight", 8);
            Rank.Nine = new Rank("Nine", 9);
            Rank.Ten = new Rank("Ten", 10);
            Rank.Jack = new Rank("Jack", 11);
            Rank.Queen = new Rank("Queen", 12);
            Rank.King = new Rank("King", 13);
            Rank.All = [
                Rank.Ace, 
                Rank.Two, 
                Rank.Three, 
                Rank.Four, 
                Rank.Five, 
                Rank.Six, 
                Rank.Seven, 
                Rank.Eight, 
                Rank.Nine, 
                Rank.Ten, 
                Rank.Jack, 
                Rank.Queen, 
                Rank.King
            ];
            return Rank;
        })();        
        var Card = (function () {
            function Card(suit, rank) {
                this.suit = suit;
                this.rank = rank;
            }
            Card.prototype.toString = function () {
                return this.rank.name + ' of ' + this.suit.name;
            };
            return Card;
        })();        
        var Deck = (function () {
            function Deck() {
                this.cards = new Array();
                for(var n = 0; n < 13; n++) {
                    this.cards.push(new Card(Suit.All[0], Rank.All[n]));
                    this.cards.push(new Card(Suit.All[1], Rank.All[n]));
                    this.cards.push(new Card(Suit.All[2], Rank.All[n]));
                    this.cards.push(new Card(Suit.All[3], Rank.All[n]));
                }
            }
            return Deck;
        })();        
        var Game = (function () {
            function Game() {
                var myDeck = new Deck();
                console.log(myDeck.cards);
            }
            return Game;
        })();
        Estimations.Game = Game;        
    })(Bdm.Estimations || (Bdm.Estimations = {}));
    var Estimations = Bdm.Estimations;
})(Bdm || (Bdm = {}));
new Bdm.Estimations.Game();
//@ sourceMappingURL=game.js.map
