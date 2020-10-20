import FollowingZombieEnemy from "./followingZombieEnemies.js";

export default class Zombie extends FollowingZombieEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 15;
        this.damage = 3;
        this.speed = 70;
        this.knockBack = 350;

        //what range is needed to start chasing the player
        //NOTE: unlike ghost enemies, they won't stop until there's a wall between them and the player
        this.aquisitionRange = 50;
        //how often they check the player's position
        this.playerCheckInterval = 100;
        //this enemy is designed for jerky movement, randomly starting and stopping
        //it stops at different rates when chasing or not chasing the player
        this.randomMoveStopDuration = 200;
        this.chasingPlayerStopDuration = 75;
        //speed is multiplied by this number while shasing player
        this.chaseSpeedBonus = 1;
        //how long each move lasts
        this.movementDuration = 270;
        this.pointValue = 25;

        //this.canBeStill = false;

        this.descendantStartMethod();
    }

    //time = time sinces start, deltaTime = time since last frame update
    //deltaTime is used to make sure game speeds don't change based on faster/slower computers
    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("zombie-idle", "zombie-run");  
    }
}