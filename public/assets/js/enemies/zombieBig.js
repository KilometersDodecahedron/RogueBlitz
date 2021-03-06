import FollowingZombieEnemy from "./followingZombieEnemies.js";

export default class ZombieBig extends FollowingZombieEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 25;
        this.damage = 3;
        this.speed = 40;
        this.knockBack = 500;

        //set scale of explosion when this enemy dies
        this.deathExplosionEffectScale = 1;

        //what range is needed to start chasing the player
        //NOTE: unlike ghost enemies, they won't stop until there's a wall between them and the player
        this.aquisitionRange = 180;
        //how often they check the player's position
        this.playerCheckInterval = 200;
        //this enemy is designed for jerky movement, randomly starting and stopping
        //it stops at different rates when chasing or not chasing the player
        this.randomMoveStopDuration = 280;
        this.chasingPlayerStopDuration = 120;
        //speed is multiplied by this number while shasing player
        this.chaseSpeedBonus = 1.3;
        //how long each move lasts
        this.movementDuration = 350;
        
        this.pointValue = 50;

        this.descendantStartMethod();
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("zombie-big-idle", "zombie-big-run");  
    }
}