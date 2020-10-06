//you're getting Phaser from the cdn

//used to test collision boundaries
import debugDraw from "../utils/debug.js";

//import animations stored in separate files
import { createGoblinAnims } from "../anims/enemyAnims.js";
import { createPlayerAnims } from "../anims/playerAnims.js";

//import enemies
import Goblin from "../enemies/goblin.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
        //player character
        this.knight = undefined;
        //arrow keys and space bar get stored in here
        this.cursors = undefined;
    }

    preload() {
        //set the arrow keys and space bar to the cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        //add animations
        createPlayerAnims(this.anims);
        createGoblinAnims(this.anims);

        const map = this.make.tilemap({key: 'dungeon'});
        //extra numbers are because tileset was "extruded" tile-extruder too make them fit together better
        const tileset = map.addTilesetImage("dungeonPack", 'tiles', 16, 16, 1, 2);

        
        //create the floor
        //not storing the Floor layer in a variable, since it won't need to do anything
        map.createStaticLayer("Floor", tileset);
        //store walls in layer to give them properties
        const wallsLayer = map.createStaticLayer("Walls", tileset);
        
        //give walls collision
        wallsLayer.setCollisionByProperty({collides: true});

        //FOR DEBUGGING
        //debugDraw.debugDraw(wallsLayer, this);
        
        //add the knight
        this.knight = this.physics.add.sprite(200, 200, "knight", "knight-f-hit-anim-f-0.png");
        this.knight.body.setSize(14, 20).setOffset(0, 8);
        
        //set camera area
        this.cameras.main.setBounds(0, 0, 800, 560);
        //have it follow the knight
        this.cameras.main.startFollow(this.knight, true, 1, 1, 0, 0);
        //set camera zoom
        this.cameras.main.setZoom(2.5);

        this.knight.anims.play("knight-idle");
        
        const goblins = this.physics.add.group({
            classType: Goblin,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(10, 10).setOffset(4, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        
        goblins.get(125, 125, "goblin");

        this.physics.add.collider(this.knight, wallsLayer);
        this.physics.add.collider(goblins, wallsLayer);
    }

    update(){
        //do nothing if can't find controls or player
        if(!this.cursors || !this.knight){
            return;
        }

        //movement speed
        let speed = 130;

        //stop movement from previous frame
        this.knight.setVelocity(0, 0);

        //horizontal movement
        if(this.cursors.left?.isDown){
            this.knight.setVelocityX(-speed);
        }else if(this.cursors.right?.isDown){
            this.knight.setVelocityX(speed);
        }

        if(this.cursors.up?.isDown){
            this.knight.setVelocityY(-speed);
        }else if(this.cursors.down?.isDown){
            this.knight.setVelocityY(speed);
        }

        this.knight.body.velocity.normalize().scale(speed);

        //knight animation
        if(this.cursors.left?.isDown){
            this.knight.flipX = true;
            this.knight.anims.play("knight-run", true);
        }else if(this.cursors.right?.isDown){
            this.knight.flipX = false;
            this.knight.anims.play("knight-run", true);
        }else if(this.cursors.up?.isDown || this.cursors.down?.isDown){
            this.knight.anims.play("knight-run", true);
        }else{
            this.knight.anims.play("knight-idle", true);
        }
    }
}