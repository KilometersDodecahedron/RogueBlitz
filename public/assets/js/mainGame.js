import Preloader from "./scenes/Preloader.js";
import Game from "./scenes/Game.js";
import GameUI from "./scenes/GameUI.js";
import Menu from "./scenes/Menu.js"
import GameOverScreen from "./scenes/GameOverScreen.js"
import Scores from "./scenes/Scores.js"

const config = {
    type: Phaser.AUTO,
    width: 700,
    height: 460,
    autoCenter: true,
    parent: 'mygame',
    physics: {
        default: "arcade",
        arcade: {
            //Top-Down game. No Gravity needed
            gravity: { y: 0 },
            debug: true
        }
    },

    //add Menu class first once button is built
    scene: [Menu, Preloader, Game, GameUI, GameOverScreen, Scores],

    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            }
        ]
    }
}

const game = new Phaser.Game(config);
