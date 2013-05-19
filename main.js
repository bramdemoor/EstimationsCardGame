var Estimations;
(function (Estimations) {
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
            console.log('starting round...');
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
            this.players = [
                new Player("Bram", this), 
                new Player("Player2", this), 
                new Player("Player3", this), 
                new Player("Player4", this)
            ];
            while(true) {
                if(this.rounds.length == Math.floor(Deck.MAX_CARDS / this.players.length)) {
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
})(Estimations || (Estimations = {}));
var program = require('commander');
program.version('0.0.1');
var namesMap = {
    11: 'J',
    12: 'Q',
    13: 'K'
};
var symbols = [
    {
        key: Estimations.Suits.Spades,
        value: '♠',
        color: 'black'
    }, 
    {
        key: Estimations.Suits.Clubs,
        value: '♣',
        color: 'black'
    }, 
    {
        key: Estimations.Suits.Diamonds,
        value: '♦',
        color: 'red'
    }, 
    {
        key: Estimations.Suits.Hearts,
        value: '♥',
        color: 'red'
    }
];
function getName(suit, rank) {
    return '';
}
console.log('Starting game...');
var game = new Estimations.Game();
//@ sourceMappingURL=main.js.map
