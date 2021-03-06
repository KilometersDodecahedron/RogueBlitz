export default class oader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        //the map
        this.load.image('tiles', "../assets/img/Tiles/dungeonPack_extruded.png");
        this.load.tilemapTiledJSON('dungeon', '../assets/json/tilemaps/fourth-tiles.json');

        //the player
        this.load.atlas("knight", "../assets/img/player/knight.png", "../assets/json/player/knight.json");
        this.load.image("tombstone", "../assets/img/player/tombstone.png");

        //weapons
        this.load.image("knife", "../assets/img/player/weapons/weapon_knife.png")
        this.load.image("axe", "../assets/img/player/weapons/weapon_axe.png")

        //enemies
        this.load.atlas("goblin", "../assets/img/enemies/goblin.png", "../assets/json/enemies/goblin.json");
        this.load.atlas("ogre", "../assets/img/enemies/ogre.png", "../assets/json/enemies/ogre.json");
        this.load.atlas("demon", "../assets/img/enemies/demon.png", "../assets/json/enemies/demon.json");
        this.load.atlas("demon-small", "../assets/img/enemies/demon-small.png", "../assets/json/enemies/demon-small.json");
        this.load.atlas("necromancer", "../assets/img/enemies/necromancer.png", "../assets/json/enemies/necromancer.json");
        this.load.atlas("ooze-swampy", "../assets/img/enemies/ooze-swampy.png", "../assets/json/enemies/ooze-swampy.json");
        this.load.atlas("ooze-muddy", "../assets/img/enemies/ooze-muddy.png", "../assets/json/enemies/ooze-muddy.json");
        this.load.atlas("zombie-ice", "../assets/img/enemies/zombie-ice.png", "../assets/json/enemies/zombie-ice.json");
        this.load.atlas("skeleton", "../assets/img/enemies/skeleton.png", "../assets/json/enemies/skeleton.json");
        this.load.atlas("zombie", "../assets/img/enemies/zombie.png", "../assets/json/enemies/zombie.json");
        this.load.atlas("orc-masked", "../assets/img/enemies/orc-masked.png", "../assets/json/enemies/orc-masked.json");
        this.load.atlas("demon-big", "../assets/img/enemies/demon-big.png", "../assets/json/enemies/demon-big.json");
        this.load.atlas("wogol", "../assets/img/enemies/wogol.png", "../assets/json/enemies/wogol.json");
        this.load.atlas("zombie-big", "../assets/img/enemies/zombie-big.png", "../assets/json/enemies/zombie-big.json");
        this.load.atlas("orc-warrior", "../assets/img/enemies/orc-warrior.png", "../assets/json/enemies/orc-warrior.json");

        //attacks
        this.load.atlas("energy-ball", "../assets/img/enemies/attacks/energy_ball.png", "../assets/json/enemies/attacks/energy_ball.json");
        this.load.image("rusty-sword", "../assets/img/enemies/attacks/weapon_rusty_sword.png");
        this.load.image("spiked-club", "../assets/img/enemies/attacks/weapon_baton_with_spikes.png");
        this.load.image("spear", "../assets/img/enemies/attacks/weapon_spear.png");

        //hearts for health
        this.load.image("ui-heart-full", "../assets/img/ui/ui_heart_full.png");
        this.load.image("ui-heart-half", "../assets/img/ui/ui_heart_half.png");
        this.load.image("ui-heart-empty", "../assets/img/ui/ui_heart_empty.png");

        //ui and backgrounds
        this.load.image("Menubackground", "../assets/img/pics/Menubackground.png");
        this.load.image("mana-bar-chunk", "../assets/img/ui/mana-bar-rectangle.png");
        this.load.image("mana-bar-chunk-empty", "../assets/img/ui/mana-bar-rectangle-empty.png");

        //effects
        this.load.atlas("explosion-sample", "../assets/img/effects/explosion-sample.png", "../assets/json/effects/explosion-sample.json");
        this.load.atlas("color-particles", "../assets/img/effects/colored-particles.png", "../assets/json/effects/colored-particles.json");
        this.load.image("black-circle", "../assets/img/effects/black-circle.png")
        this.load.image("shouting-mouth", "../assets/img/effects/shouting-mouth.png")
    }

    create() {
        this.scene.start('menu');
    }
}