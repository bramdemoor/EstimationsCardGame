var Estimations;
(function (Estimations) {
    var Card = (function () {
        function Card(rank, suit) {
            this.rank = rank;
            this.suit = suit;
        }
        Card.compare = function compare(a, b) {
            return (a.suit * 10 + a.rank) - (b.suit * 10 + b.rank);
        };
        Card.prototype.print = function () {
            if(this.suit == 1 || this.suit == 2) {
                process.stdout.write((this.getSymbol()).red);
                process.stdout.write((this.getValue()).red);
            } else {
                process.stdout.write((this.getSymbol()).grey);
                process.stdout.write((this.getValue()).grey);
            }
        };
        Card.prototype.getSymbol = function () {
            if(this.suit == 1) {
                return '♥';
            }
            if(this.suit == 2) {
                return '♦';
            }
            if(this.suit == 3) {
                return '♣';
            }
            if(this.suit == 4) {
                return '♠';
            }
            return '?';
        };
        Card.prototype.getValue = function () {
            if(this.rank == 11) {
                return 'J';
            }
            if(this.rank == 12) {
                return 'Q';
            }
            if(this.rank == 13) {
                return 'K';
            }
            return this.rank.toString();
        };
        return Card;
    })();
    Estimations.Card = Card;    
    var Player = (function () {
        function Player(name, game) {
            this.name = name;
            this.game = game;
            this.hand = new Array();
        }
        Player.prototype.giveCard = function (card) {
            this.hand.push(card);
        };
        Player.prototype.getEstimate = function () {
            return new Estimate(this, Math.floor(this.hand.length / 4));
        };
        Player.prototype.takeCardToPut = function () {
            return this.hand.pop();
        };
        return Player;
    })();
    Estimations.Player = Player;    
    var Deck = (function () {
        function Deck(cardsToRemoveCount) {
            if (typeof cardsToRemoveCount === "undefined") { cardsToRemoveCount = 0; }
            this.cards = new Array();
            for(var n = 0; n < 13; n++) {
                for(var s = 0; s < 4; s++) {
                    this.cards.push(new Card(n + 1, s + 1));
                }
            }
            this.shuffle();
            this.cards.splice(0, cardsToRemoveCount);
        }
        Deck.MAX_CARDS = 52;
        Deck.prototype.shuffle = function () {
            this.cards.forEach(function (c) {
                c.print();
            });
        };
        Deck.prototype.dealTo = function (players) {
            var playerIndex = 0;
            while(this.cards.length > 0) {
                players[playerIndex++ % players.length].giveCard(this.cards.pop());
            }
        };
        return Deck;
    })();
    Estimations.Deck = Deck;    
    var Estimate = (function () {
        function Estimate(player, estimatedWins) {
            this.player = player;
            this.estimatedWins = estimatedWins;
        }
        return Estimate;
    })();
    Estimations.Estimate = Estimate;    
    var Turn = (function () {
        function Turn(player) {
            this.player = player;
        }
        Turn.prototype.play = function () {
            this.card = this.player.takeCardToPut();
        };
        return Turn;
    })();
    Estimations.Turn = Turn;    
    var MiniRound = (function () {
        function MiniRound(game) {
            this.game = game;
            this.turns = new Array();
        }
        MiniRound.prototype.play = function () {
            var currentPlayerIndex = 0;
            while(true) {
                if(this.turns.length == this.game.players.length) {
                    this.turns.sort(function (a, b) {
                        return Card.compare(a.card, b.card);
                    });
                    console.log('highest card was from ' + this.turns[3].player.name);
                    break;
                } else {
                    var turn = new Turn(this.game.players[currentPlayerIndex++]);
                    turn.play();
                    this.turns.push(turn);
                }
            }
        };
        return MiniRound;
    })();
    Estimations.MiniRound = MiniRound;    
    var Round = (function () {
        function Round(roundNumber, game) {
            this.game = game;
            this.estimates = new Array();
            this.minirounds = new Array();
            this.cardsToRemoveCount = roundNumber * game.players.length;
            this.deck = new Deck(this.cardsToRemoveCount);
        }
        Round.prototype.play = function () {
            var _this = this;
            this.deck.dealTo(this.game.players);
            this.game.players.forEach(function (p) {
                _this.estimates.push(p.getEstimate());
            });
            var maxSlagen = Math.floor((Deck.MAX_CARDS - this.cardsToRemoveCount) / this.game.players.length);
            while(true) {
                if(this.minirounds.length == maxSlagen) {
                    break;
                }
                var miniRound = new MiniRound(this.game);
                miniRound.play();
                this.minirounds.push(miniRound);
            }
        };
        return Round;
    })();
    Estimations.Round = Round;    
    var Game = (function () {
        function Game() {
            this.rounds = new Array();
        }
        Game.prototype.start = function () {
            while(true) {
                if(this.rounds.length == Math.floor(Deck.MAX_CARDS / this.players.length)) {
                    break;
                }
                this.currentRound = new Round(this.rounds.length + 1, this);
                this.currentRound.play();
                this.rounds.push(this.currentRound);
            }
        };
        return Game;
    })();
    Estimations.Game = Game;    
})(Estimations || (Estimations = {}));
var program = require('commander');
var colors = require('colors');
program.version('0.0.1');
console.log('Starting game...');
var game = new Estimations.Game();
game.players = [
    new Estimations.Player("Bram", game), 
    new Estimations.Player("Player2", game), 
    new Estimations.Player("Player3", game), 
    new Estimations.Player("Player4", game)
];
game.start();
//@ sourceMappingURL=main.js.map
