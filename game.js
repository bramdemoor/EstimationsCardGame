var Bdm;
(function (Bdm) {
    (function (Estimations) {
        var CurrentStack = (function () {
            function CurrentStack() {
                this.turns = new Array();
            }
            CurrentStack.prototype.putCard = function (player, card) {
                this.turns.push({
                    player: player,
                    card: card
                });
            };
            CurrentStack.prototype.sort = function () {
                this.turns.sort(function (a, b) {
                    return Card.compare(a.card, b.card);
                });
            };
            CurrentStack.prototype.isFull = function () {
                return this.turns.length == 4;
            };
            CurrentStack.prototype.finalize = function () {
                this.sort();
                var obj = this.turns[3].player.name;
                this.turns = [];
                return obj;
            };
            return CurrentStack;
        })();
        Estimations.CurrentStack = CurrentStack;        
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
                return {
                    name: name,
                    estimate: Math.floor(this.hand.length / 4)
                };
            };
            Player.prototype.doTurn = function () {
                this.game.currentRound.stack.putCard(this, this.hand.pop());
            };
            Player.prototype.hasCards = function () {
                return this.hand.length > 0;
            };
            return Player;
        })();
        Estimations.Player = Player;        
        (function (Suits) {
            Suits._map = [];
            Suits.Hearts = 1;
            Suits._map[2] = "Diamonds";
            Suits.Diamonds = 2;
            Suits._map[3] = "Clubs";
            Suits.Clubs = 3;
            Suits._map[4] = "Spades";
            Suits.Spades = 4;
        })(Estimations.Suits || (Estimations.Suits = {}));
        var Suits = Estimations.Suits;
        (function (Ranks) {
            Ranks._map = [];
            Ranks.Ace = 1;
            Ranks._map[2] = "Two";
            Ranks.Two = 2;
            Ranks._map[3] = "Three";
            Ranks.Three = 3;
            Ranks._map[4] = "Four";
            Ranks.Four = 4;
            Ranks._map[5] = "Five";
            Ranks.Five = 5;
            Ranks._map[6] = "Six";
            Ranks.Six = 6;
            Ranks._map[7] = "Seven";
            Ranks.Seven = 7;
            Ranks._map[8] = "Eight";
            Ranks.Eight = 8;
            Ranks._map[9] = "Nine";
            Ranks.Nine = 9;
            Ranks._map[10] = "Ten";
            Ranks.Ten = 10;
            Ranks._map[11] = "Jack";
            Ranks.Jack = 11;
            Ranks._map[12] = "Queen";
            Ranks.Queen = 12;
            Ranks._map[13] = "King";
            Ranks.King = 13;
        })(Estimations.Ranks || (Estimations.Ranks = {}));
        var Ranks = Estimations.Ranks;
        var Card = (function () {
            function Card(suit, rank) {
                this.suit = suit;
                this.rank = rank;
            }
            Card.compare = function compare(a, b) {
                return (a.suit * 10 + a.rank) - (b.suit * 10 + b.rank);
            };
            return Card;
        })();
        Estimations.Card = Card;        
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
                for(var j, x, i = this.cards.length; i; j = parseInt(Math.random() * i) , x = this.cards[--i] , this.cards[i] = this.cards[j] , this.cards[j] = x) {
                }
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
        var Round = (function () {
            function Round(roundNumber, game) {
                this.game = game;
                this.estimates = new Array();
                this.deck = new Deck(roundNumber * game.players.length);
                this.stack = new CurrentStack();
            }
            Round.prototype.play = function () {
                var _this = this;
                var currentPlayerIndex = 0;
                this.deck.dealTo(this.game.players);
                this.game.players.forEach(function (p) {
                    _this.estimates.push(p.getEstimate());
                });
                while(true) {
                    var player = this.game.players[currentPlayerIndex++ % this.game.players.length];
                    if(!player.hasCards()) {
                        break;
                    }
                    if(this.stack.isFull()) {
                        var highest = this.stack.finalize();
                        console.log('highest card was from ' + highest);
                    }
                    player.doTurn();
                }
            };
            return Round;
        })();
        Estimations.Round = Round;        
        var Game = (function () {
            function Game() {
                this.rounds = new Array();
                this.players = [
                    new Player("Bram", this), 
                    new Player("Player2", this), 
                    new Player("Player3", this), 
                    new Player("Player4", this)
                ];
                var maxRounds = Math.floor(Deck.MAX_CARDS / this.players.length);
                while(true) {
                    if(this.rounds.length == maxRounds) {
                        break;
                    }
                    this.currentRound = new Round(this.rounds.length + 1, this);
                    this.currentRound.play();
                    this.rounds.push(this.currentRound);
                }
            }
            return Game;
        })();
        Estimations.Game = Game;        
    })(Bdm.Estimations || (Bdm.Estimations = {}));
    var Estimations = Bdm.Estimations;
})(Bdm || (Bdm = {}));
//@ sourceMappingURL=game.js.map
