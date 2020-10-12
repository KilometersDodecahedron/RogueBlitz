import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class Skeleton extends RandomlyMovingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 5;
        this.damage = 1;
        this.speed = 95;
        this.knockBack = 150;
        this.changeDirectionInterval = 2000;
        this.movesFromTheStart = true;
        this.canBeStill = false;
        this.canMoveDiagonally = true;
        this.pointValue = 15;
        this.descendantStartMethod();
    }

    //time = time sinces start, deltaTime = time since last frame update
    //deltaTime is used to make sure game speeds don't change based on faster/slower computers
    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("skelet-idle", "skelet-run");  
    }
}