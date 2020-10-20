import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class demonSmall extends RandomlyMovingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 5;
        this.damage = 2;
        this.speed = 65;
        this.knockBack = 100;

        this.bounceSpeed = 240;
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
        this.manageMovement("demon-small-idle", "demon-small-run");  
    }
}