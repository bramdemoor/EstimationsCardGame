var Bdm;
(function (Bdm) {
    (function (Estimations) {
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
