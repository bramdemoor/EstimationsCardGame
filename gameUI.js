var Bdm;
(function (Bdm) {
    (function (Estimations) {
        (function (UI) {
            var PlayerViewModel = (function () {
                function PlayerViewModel(player) {
                    this.name = ko.observable(player.name);
                }
                return PlayerViewModel;
            })();
            UI.PlayerViewModel = PlayerViewModel;            
            var CardViewModel = (function () {
                function CardViewModel(suit, rank) {
                    this.suit = suit;
                    this.rank = rank;
                    var _this = this;
                    this.suitNames = [
                        "Hearts", 
                        "Diamonds", 
                        "Clubs", 
                        "Spades"
                    ];
                    this.rankNames = [
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
                    this.friendlyName = ko.computed(function () {
                        return _this.rankNames[rank - 1] + ' of ' + _this.suitNames[suit - 1];
                    });
                }
                return CardViewModel;
            })();
            UI.CardViewModel = CardViewModel;            
            var GamePage = (function () {
                function GamePage() {
                    this.someCard = new CardViewModel(Estimations.Suits.Hearts, Estimations.Ranks.Ace);
                }
                GamePage.prototype.startGame = function () {
                    this.game = new Estimations.Game();
                    this.players = ko.observableArray(ko.utils.arrayMap(this.game.players, function (p) {
                        return new PlayerViewModel(p);
                    }));
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
