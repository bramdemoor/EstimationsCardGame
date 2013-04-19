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
                this.game.stack.putCard(this, this.hand.pop());
            };
            Player.prototype.hasCards = function () {
                return this.hand.length > 0;
            };
            return Player;
        })();        
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
            Card.prototype.getValueHash = function () {
                return this.suit.value * 10 + this.rank.value;
            };
            Card.compare = function compare(a, b) {
                return a.getValueHash() - b.getValueHash();
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
                this.shuffle();
            }
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
        var Game = (function () {
            function Game() {
                console.log('game start');
                var players = [
                    new Player("Bram", this), 
                    new Player("Player2", this), 
                    new Player("Player3", this), 
                    new Player("Player4", this)
                ];
                var roundCounter = 0;
                var roundsLeft = true;
                while(roundsLeft) {
                    console.log('Dealing for round ' + (roundCounter + 1));
                    var myDeck = new Deck();
                    this.stack = new CurrentStack();
                    var playing = true;
                    var currentPlayerIndex = 0;
                    var estimates = [];
                    myDeck.dealTo(players);
                    players.forEach(function (p) {
                        estimates.push(p.getEstimate());
                    });
                    while(playing) {
                        var player = players[currentPlayerIndex++ % players.length];
                        if(!player.hasCards()) {
                            playing = false;
                            break;
                        }
                        if(this.stack.isFull()) {
                            var highest = this.stack.finalize();
                            console.log('highest card was from ' + highest);
                        }
                        player.doTurn();
                    }
                    roundsLeft = false;
                }
            }
            return Game;
        })();
        Estimations.Game = Game;        
    })(Bdm.Estimations || (Bdm.Estimations = {}));
    var Estimations = Bdm.Estimations;
})(Bdm || (Bdm = {}));
new Bdm.Estimations.Game();
//@ sourceMappingURL=game.js.map
