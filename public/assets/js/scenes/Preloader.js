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
    }

    create() {
        this.scene.start('game');
    }
}