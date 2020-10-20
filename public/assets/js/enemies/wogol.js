import FollowingZombieEnemy from "./followingZombieEnemies.js";

export default class Wogol extends FollowingZombieEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 10;
        this.damage = 1;
        this.speed = 50;
        this.knockBack = 300;
        //how far this enemy bounces back after colliding with the player
        this.bounceSpeed = 200;

        //what range is needed to start chasing the player
        //NOTE: unlike ghost enemies, they won't stop until there's a wall between them and the player
        this.aquisitionRange = 200;
        //how often they check the player's position
        this.playerCheckInterval = 200;
        //this enemy is designed for jerky movement, randomly starting and stopping
        //it stops at different rates when chasing or not chasing the player
        this.randomMoveStopDuration = 130;
        this.chasingPlayerStopDuration = 850;
        //speed is multiplied by this number while shasing player
        this.chaseSpeedBonus = 3;
        //how long each move lasts
        this.movementDuration = 350;

        this.pointValue = 25;

        this.descendantStartMethod();
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("wogol-idle", "wogol-run");  
    }
}