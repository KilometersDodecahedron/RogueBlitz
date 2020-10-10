export default class GameOverScreen extends Phaser.Scene {
    constructor() {
        super("gameOverScreen");

        this.gameOverText;
        this.playAgainButton;
    }

    create(){
        this.gameOverText = this.add.text(400, 200, "Game Over");

        console.log("Game Over");
    }
}
