import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class Necromancer extends RandomlyMovingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 15;
        this.damage = 6;
        this.speed = 45;
        this.knockBack = 150;
        this.changeDirectionInterval = 2000;
        this.movesFromTheStart = true;
        this.canBeStill = false;
        this.canMoveDiagonally = true;

        this.descendantStartMethod();
    }

    //time = time sinces start, deltaTime = time since last frame update
    //deltaTime is used to make sure game speeds don't change based on faster/slower computers
    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("necromancer-idle", "necromancer-run");  
    }
}