export default class oader extends Phaser.Scene {
    constructor() {
        super("oader");
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

        //enemies
        this.load.atlas("goblin", "../assets/img/enemies/goblin.png", "../assets/json/enemies/goblin.json");
        this.load.atlas("ogre", "../assets/img/enemies/ogre.png", "../assets/json/enemies/ogre.json");
        this.load.atlas("demon", "../assets/img/enemies/demon.png", "../assets/json/enemies/demon.json");
        this.load.atlas("demon-small", "../assets/img/enemies/demon-small.png", "../assets/json/enemies/demon-small.json");
        this.load.atlas("necromancer", "../assets/img/enemies/necromancer.png", "../assets/json/enemies/necromancer.json");
        this.load.atlas("ooze-swampy", "../assets/img/enemies/ooze-swampy.png", "../assets/json/enemies/ooze-swampy.json");
        this.load.atlas("ooze-muddy", "../assets/img/enemies/ooze-muddy.png", "../assets/json/enemies/ooze-muddy.json");
        this.load.atlas("zombie-ice", "../assets/img/enemies/zombie-ice.png", "../assets/json/enemies/zombie-ice.json");

        //attacks
        this.load.atlas("energy-ball", "../assets/img/enemies/attacks/energy_ball.png", "../assets/json/enemies/attacks/energy_ball.json")

        //hearts for health
        this.load.image("ui-heart-full", "../assets/img/ui/ui_heart_full.png");
        this.load.image("ui-heart-half", "../assets/img/ui/ui_heart_half.png");
        this.load.image("ui-heart-empty", "../assets/img/ui/ui_heart_empty.png");
    }

    create() {
        this.scene.start('game');
    }
}