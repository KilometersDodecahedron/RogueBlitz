import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class Ogre extends RandomlyMovingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 10;
        this.damage = 4;
        this.speed = 25;
        this.knockBack = 500;
        this.changeDirectionInterval = 2000;
        this.movesFromTheStart = true;
        this.canBeStill = true;
        this.canMoveDiagonally = true;

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