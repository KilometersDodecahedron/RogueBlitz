import Preloader from "./scenes/Preloader.js";
import Game from "./scenes/Game.js";
import GameUI from "./scenes/GameUI.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 560,
    physics: {
        default: "arcade",
        arcade: {
            //Top-Down game. No Gravity needed
            gravity: {y: 0},
            debug: true
        }
    },
    scene: [Preloader, Game, GameUI]
}

const game = new Phaser.Game(config);
