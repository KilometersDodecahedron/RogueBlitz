export default class Scores extends Phaser.Scene {
    constructor() {
        super('scores');
        this.Menubackground;
        this.title;
        this.menu;

        //stats of the letters
        this.rowStartHeight = 100;
        this.newRowIncrement = 65;
        this.leftColumnPosition = 180;
        this.rightColumnPosition = 530;
        this.scoreTextConfig = {
            fontSize:'30px',
            color:'#ffffff',
            fontFamily: 'Arial'
        };

        this.highScoreArray;
    }

    //pass in the High Scores from the AJAX call on the Menu
    init(data){
        this.highScoreArray = data;
    }
    
    create() {
        //background image
        this.Menubackground = this.add.image( 400, 280, "Menubackground");
        this.Menubackground.setScale(1.25,1.7)
        
        //display score AFTER loading the background
        this.displayScores(this.highScoreArray);

        //title text
        var titleConfig={fontSize:'50px',color:'#ff0000',fontFamily: 'Arial'};
        this.title=this.add.text(2,.75,"HIGH SCORES",titleConfig);
        this.title.setOrigin(-.65,-.25);

        //rectangle button place holders and text
        var r1 = this.add.rectangle(400, 475, 320, 90, 0xff0000);

        //main menu button text
        var menuConfig={fontSize:'40px',color:'#000000',fontFamily: 'Arial'};
        this.menu=this.add.text(2,.75,"MAIN MENU", menuConfig);
        this.menu.setOrigin(-1.22,-10.34);

        //makes main menu button return to main menu
        r1.setInteractive();
        r1.on('pointerdown', () => { this.scene.start('menu');});
    }

    //helper function for adding the scores to the scene
    displayScores(scoresArray){
        var currentRowIncrement = 0;
        for(let i = 0; i < scoresArray.length; i++){
            var score = this.add.text(0,0, `${i + 1}. ${this.highScoreArray[i].score}`, this.scoreTextConfig);
            
            //put odd numbers on the left 
            if(i % 2 == 0){
                score.setPosition(this.leftColumnPosition, this.rowStartHeight + currentRowIncrement);

            }else{
                score.setPosition(this.rightColumnPosition, this.rowStartHeight + currentRowIncrement);
                currentRowIncrement += this.newRowIncrement;
            }
        }
    }
}