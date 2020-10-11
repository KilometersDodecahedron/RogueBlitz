export default class GameOverScreen extends Phaser.Scene {
    constructor() {
        super("gameOverScreen");
        this.Menubackground;
        this.playAgainButton;
        this.score;
        this.highScoreArray;
    }

    init(data){
        this.score = data.score;
        this.highScoreArray = data.highScoreArray;
        console.log(this.highScoreArray);
    }

    create(){
        //background image
        this.Menubackground = this.add.image( 400, 280, "Menubackground");
        this.Menubackground.setScale(1.25,1.7)

        this.checkIfNewHighScore();

        const gameOverText = this.add.text(400, 200, "Game Over");
        const finalScoreText = this.add.text(400, 300, "Final Score");
        const scoreDisplay = this.add.text(400, 350, this.score);

        this.playAgainButton = this.add.rectangle(200, 400, 100, 100, 0xffffff);

        this.playAgainButton.setInteractive();

        this.playAgainButton.on('pointerdown', () => {
            this.scene.start("menu"); 
        });
    }

    checkIfNewHighScore(){
        var newHighScore = false;
        var newScoreObject;

        for(let i = 0; i < this.highScoreArray.length; i++){
            if(this.score > this.highScoreArray[i].score){
                console.log(`${this.score} is larger than ${this.highScoreArray[i].score}`);
                console.log(i + 1);
                newHighScore = true;
                newScoreObject = {score: this.score};
                break;
            }
        }

        //if there's a new high score, save it to the database
        if(newHighScore){
            $.ajax("/api/highScores/newHighScore", {
                type: "POST",
                data: newScoreObject,
                context: this
            }).then(function(){
                const newHighScoreText = this.add.text(400, 250, "New High Score!");
            });
        }
    }
}
