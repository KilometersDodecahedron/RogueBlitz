import FollowingGhostEnemy from "./followingGhostEnemies.js";

export default class OozeSwampy extends FollowingGhostEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.health = 15;
        this.speed = 75;
        this.damage = 2;
        this.knockBack = 240;

        //distance the to the player before it starts following
        this.aquisitionRange = 150;
        //distance from a player before it stops following
        this.breakFollowRange = 175;

        //how often to check for the player's position while idle
        this.playerCheckInterval = 250;
        //how often to check for the player's position while chasing
        this.directionCheckInterval = 500;
<<<<<<< HEAD

        this.pointValue = 45;
=======
>>>>>>> 9a5c460bde55383f21b8bd849d3d4bba6df73aaa
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("ooze-swampy-idle", "ooze-swampy-run");
    }
}