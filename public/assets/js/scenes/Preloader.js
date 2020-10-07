export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        //the map
        this.load.image('tiles', "../assets/img/Tiles/dungeonPack_extruded.png");
        this.load.tilemapTiledJSON('dungeon', '../assets/json/tilemaps/fourth-tiles.json');

        //the player
        this.load.atlas("knight", "../assets/img/player/knight.png", "../assets/json/player/knight.json");

        //enemies
        this.load.atlas("goblin", "../assets/img/enemies/goblin.png", "../assets/json/enemies/goblin.json");
        this.load.atlas("ogre", "../assets/img/enemies/ogre.png", "../assets/json/enemies/ogre.json");
        this.load.atlas("demon", "../assets/img/enemies/demon.png", "../assets/json/enemies/demon.json");
        this.load.atlas("necromancer", "../assets/img/enemies/necromancer.png", "../assets/json/enemies/necromancer.json");
    }

    create() {
        this.scene.start('game');
    }
}