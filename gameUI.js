var Bdm;
(function (Bdm) {
    (function (Estimations) {
        (function (UI) {
            var CardViewModel = (function () {
                function CardViewModel(suit, rank) {
                    this.suit = suit;
                    this.rank = rank;
                    this.friendlyName = ko.computed(function () {
                        return rank.name + ' of ' + suit.name;
                    });
                }
                CardViewModel.suitNames = [
                    "Hearts", 
                    "Diamonds", 
                    "Clubs", 
                    "Spades"
                ];
                CardViewModel.rankNames = [
                    "Ace", 
                    "Two", 
                    "Three", 
                    "Four", 
                    "Five", 
                    "Six", 
                    "Seven", 
                    "Eight", 
                    "Nine", 
                    "Ten", 
                    "Jack", 
                    "Queen", 
                    "King"
                ];
                return CardViewModel;
            })();
            UI.CardViewModel = CardViewModel;            
            var GamePage = (function () {
                function GamePage() {
                    this.someCard = new CardViewModel(Estimations.Suit.Hearts, Estimations.Rank.Ace);
                }
                GamePage.prototype.startGame = function () {
                    this.game = new Estimations.Game();
                    ko.applyBindings(this);
                };
                GamePage.prototype.nextTurn = function () {
                    console.log('next turn.');
                };
                return GamePage;
            })();
            UI.GamePage = GamePage;            
        })(Estimations.UI || (Estimations.UI = {}));
        var UI = Estimations.UI;
    })(Bdm.Estimations || (Bdm.Estimations = {}));
    var Estimations = Bdm.Estimations;
})(Bdm || (Bdm = {}));
//@ sourceMappingURL=gameUI.js.map
