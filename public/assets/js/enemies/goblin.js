import Enemy from "./enemyClass.js";

export default class Goblin extends Enemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 5;
        this.speed = 130;
        this.canBeStill = false;
        this.canMoveDiagonally = true;

        this.setMovementInRandomDirection();

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this);
    }

    handleTileCollision(gameObject, tile){
        if(gameObject !== this){
            return;
        }

        this.setMovementInRandomDirection();
    }

    //time = time sinces start, deltaTime = time since last frame update
    //deltaTime is used to make sure game speeds don't change based on faster/slower computers
    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("goblin-idle", "goblin-run");

        
    }
}