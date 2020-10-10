export default class GameOverScreen extends Phaser.Scene {
    constructor() {
        super("gameOverScreen");

        this.gameOverText;
        this.playAgainButton;
        this.graphics;
    }

    create(){
        this.gameOverText = this.add.text(400, 200, "Game Over");

        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffffff, 1);   

        this.playAgainButton = new Phaser.Geom.Rectangle(200, 400, 100, 100);

        this.graphics.fillRectShape(this.playAgainButton);

        this.playAgainButton.setInteractive();

        this.playAgainButton.on('pointerover', () => { console.log('pointerover'); });
    }
}
