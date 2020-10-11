export default class GameOverScreen extends Phaser.Scene {
    constructor() {
        super("gameOverScreen");
        this.Menubackground;
        this.playAgainButton;
        this.score;
    }

    init(data){
        this.score = data.score;
    }

    create(){
        //background image
        this.Menubackground = this.add.image( 400, 280, "Menubackground");
        this.Menubackground.setScale(1.25,1.7)

        const gameOverText = this.add.text(400, 200, "Game Over");
        const finalScoreText = this.add.text(400, 300, "Final Score");
        const scoreDisplay = this.add.text(400, 350, this.score);

        this.playAgainButton = this.add.rectangle(200, 400, 100, 100, 0xffffff);

        this.playAgainButton.setInteractive();

        this.playAgainButton.on('pointerdown', () => {
            this.scene.start("menu"); 
        });
    }
}
