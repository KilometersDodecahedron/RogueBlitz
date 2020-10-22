import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class Goblin extends RandomlyMovingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 5;
        this.damage = 1;
        this.speed = 75;
        this.knockBack = 100;

        //set scale of explosion when this enemy dies
        this.deathExplosionEffectScale = 0.6;

        this.bounceSpeed = 240;

        this.changeDirectionInterval = 2000;
        this.movesFromTheStart = true;
        this.canBeStill = false;
        this.canMoveDiagonally = false;
        this.pointValue = 15;
        this.descendantStartMethod();
    }

    //time = time sinces start, deltaTime = time since last frame update
    //deltaTime is used to make sure game speeds don't change based on faster/slower computers
    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("goblin-idle", "goblin-run");  
    }
}