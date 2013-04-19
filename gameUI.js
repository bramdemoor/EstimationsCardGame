var Bdm;
(function (Bdm) {
    (function (Estimations) {
        (function (UI) {
            var GamePage = (function () {
                function GamePage() {
                }
                GamePage.prototype.startGame = function () {
                    this.game = new Estimations.Game();
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
