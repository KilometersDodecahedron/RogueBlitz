export default class GameOverScreen extends Phaser.Scene {
    constructor() {
        super("gameOverScreen");

        this.gameOverText;
        this.playAgainButton;
    }

    create(){
        this.gameOverText = this.add.text(400, 200, "Game Over");

        this.playAgainButton = this.add.rectangle(200, 400, 100, 100, 0xffffff);

        this.playAgainButton.setInteractive();

        this.playAgainButton.on('pointerdown', () => {
            this.scene.start("menu"); 
        });
    }
}
