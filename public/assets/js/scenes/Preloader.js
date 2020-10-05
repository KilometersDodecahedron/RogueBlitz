export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    

    preload() {
        //the map
        this.load.image('tiles', "../assets/img/Tiles/dungeonPack.png");
        this.load.tilemapTiledJSON('dungeon', '../assets/json/tilemaps/fourth-tiles.json');

        //the player
        this.load.atlas("knight", "../assets/img/player/knight.png", "../assets/json/player/knight.json");
    }

    create() {
        this.scene.start('game');
    }
}