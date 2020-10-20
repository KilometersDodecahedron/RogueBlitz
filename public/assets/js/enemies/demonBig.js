import ShootingEnemy from "./shootingEnemies.js";

export default class DemonBig extends ShootingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 30;
        this.damage = 3;
        this.speed = 50;
        this.knockBack = 350;

        this.bounceSpeed = 50;

        this.shotDamage = 2;
        this.shotKnockback = 200;
        //make the projectile a different color
        //write it as '0x' followed by the hexcode
        //0xffffff for no color change
        this.shotColor = 0x8B0000;
        //check if player is in range before firing
        this.fireRange = 130;
        this.shotSpeed = 45;
        //this is in milliseconds
        this.fireRate = 6000;

        this.changeDirectionInterval = 2000;
        this.movesFromTheStart = true;
        this.canBeStill = false;
        this.canMoveDiagonally = true;
        this.pointValue = 55;
        this.descendantStartMethod();
    }

    //time = time sinces start, deltaTime = time since last frame update
    //deltaTime is used to make sure game speeds don't change based on faster/slower computers
    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("demon-big-idle", "demon-big-run");  
    }
}