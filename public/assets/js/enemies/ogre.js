import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class Ogre extends RandomlyMovingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 20;
        this.damage = 4;
        this.speed = 65;
        this.knockBack = 350;

        //set scale of explosion when this enemy dies
        this.deathExplosionEffectScale = 1;

        this.changeDirectionInterval = 2000;
        this.movesFromTheStart = true;
        this.canBeStill = false;
        this.canMoveDiagonally = false;
        this.pointValue = 60;
        this.descendantStartMethod();
    }

    //time = time sinces start, deltaTime = time since last frame update
    //deltaTime is used to make sure game speeds don't change based on faster/slower computers
    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("ogre-idle", "ogre-run");  
    }
}