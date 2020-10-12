import FollowingGhostEnemy from "./followingGhostEnemies.js";

export default class OozeMuddy extends FollowingGhostEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.health = 10;
        this.speed = 90;
        this.damage = 1;
        this.knockBack = 400;

        //change his color to make him stand out more against the brown floor
        this.naturalTint = 0xFFFF33;

        //distance the to the player before it starts following
        this.aquisitionRange = 150;
        //distance from a player before it stops following
        this.breakFollowRange = 175;

        //how often to check for the player's position while idle
        this.playerCheckInterval = 150;
        //how often to check for the player's position while chasing
        this.directionCheckInterval = 1000;

        this.pointValue = 70;
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("ooze-muddy-idle", "ooze-muddy-run");
    }
}