export default class Scores extends Phaser.Scene {
    constructor() {
        super('scores');
        this.Menubackground;
        this.title;
        this.menu;
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
        console.log("Ready!");
    }
}