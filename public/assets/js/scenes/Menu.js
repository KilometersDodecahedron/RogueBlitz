export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
        this.Menubackground;
        this.title;
        this.play;
        this.scores;
    }
    preload()
    {
    	this.load.image("Menubackground", "../assets/img/pics/Menubackground.png");
    }
    create() {

        //background image
        this.Menubackground = this.add.image( 400, 280, "Menubackground");
        this.Menubackground.setScale(1.25,1.7)

        //title text
        var titleConfig={fontSize:'50px',color:'#ff0000',fontFamily: 'Arial'};
        this.title=this.add.text(2,.75,"ROGUE BLITZ",titleConfig);
        this.title.setOrigin(-.67,-.25);

        //rectangle button place holders and text
        var r1 = this.add.rectangle(400, 200, 320, 110, 0xff0000);
        var r2 = this.add.rectangle(400, 350, 320, 110, 0xff0000);
        //play button text
        var playConfig={fontSize:'40px',color:'#000000',fontFamily: 'Arial'};
        this.play=this.add.text(2,.75,"PLAY",playConfig);
        this.play.setOrigin(-3.5,-4);
        //highscores text
        var scoresConfig={fontSize:'40px',color:'#000000',fontFamily: 'Arial'};
        this.scores=this.add.text(2,.75,"HIGH SCORES",scoresConfig);
        this.scores.setOrigin(-.92,-7.43);
        r1.setInteractive();
        r1.on('pointerdown', () => { this.scene.start('preloader');});
        r2.setInteractive();
        r2.on('pointerdown', () => { this.scene.start('scores');});
        console.log("Ready!");
    }
}