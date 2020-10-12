export default class GameOverScreen extends Phaser.Scene {
    constructor() {
        super("gameOverScreen");
        this.Menubackground;
        this.playAgainButton;
        this.score;
        this.highScoreArray;

        this.textConfig = {fontSize:'50px',color:'#ff0000',fontFamily: 'Arial'};
        this.buttonTextConfig = {fontSize:'40px',color:'#000000',fontFamily: 'Arial'};
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

        const gameOverText = this.add.text(400, 50, "Game Over", this.textConfig).setOrigin(0.5);
        const finalScoreText = this.add.text(400, 150, "Final Score", this.textConfig).setOrigin(0.5);
        const scoreDisplay = this.add.text(400, 230, this.score, this.textConfig).setOrigin(0.5);

        this.playAgainButton = this.add.rectangle(400, 450, 320, 100, 0xff0000).setOrigin(0.5);
        const playAginText = this.add.text(400, 450, "Main Menu", this.buttonTextConfig).setOrigin(0.5);

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
                const newHighScoreText = this.add.text(400, 340, "New High Score!", this.textConfig).setOrigin(0.5);
            });
        }
    }
}
