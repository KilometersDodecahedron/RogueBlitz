export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
        this.Menubackground;
        this.title;
    }
    preload()
    {
    	this.load.image("Menubackground", "../assets/img/pics/Menubackground.png");
    }
    create() {
        this.Menubackground = this.add.image( 400, 280, "Menubackground");

        this.Menubackground.setScale(1.25,1.7)

        var textConfig={fontSize:'50px',color:'#ff0000',fontFamily: 'Arial'};

        this.title=this.add.text(2,.75,"ROGUE BLITZ!!!",textConfig);
        this.title.setOrigin(-.6,-.25);
        console.log("Ready!");
    }
}