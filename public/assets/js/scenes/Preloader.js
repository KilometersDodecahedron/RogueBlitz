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
        this.load.image("tombstone", "../assets/img/player/tombstone.png")

        //enemies
        this.load.atlas("goblin", "../assets/img/enemies/goblin.png", "../assets/json/enemies/goblin.json");

        //hearts for health
        this.load.image("ui-heart-full", "../assets/img/ui/ui_heart_full.png");
        this.load.image("ui-heart-half", "../assets/img/ui/ui_heart_half.png");
        this.load.image("ui-heart-empty", "../assets/img/ui/ui_heart_empty.png");
    }

    create() {
        this.scene.start('game');
    }
}