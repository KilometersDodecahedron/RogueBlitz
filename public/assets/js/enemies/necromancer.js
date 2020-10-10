import ShootingEnemy from "./shootingEnemies.js";

export default class Necromancer extends ShootingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 15;
        this.damage = 2;
        this.speed = 45;
        this.knockBack = 150;

        this.shotDamage = 2;
        this.shotKnockback = 150;
        //make the projectile a different color
        //write it as '0x' followed by the hexcode
        //0xffffff for no color change
        this.shotColor = 0x671d9d;
        //check if player is in range before firing

        this.fireRange = 250;
        this.shotSpeed = 110;
        //this is in milliseconds
        this.fireRate = 2300;

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
        this.manageMovement("necromancer-idle", "necromancer-run");  
    }
}