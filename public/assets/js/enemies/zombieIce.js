import ShootingEnemy from "./shootingEnemies.js";

export default class ZombieIce extends ShootingEnemy{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        this.health = 5;
        this.speed = 45;
        this.damage = 1;
        this.knockBack = 175;

        this.shotDamage = 1;
        this.shotKnockback = 150;
        //make the projectile a different color
        //write it as '0x' followed by the hexcode
        //0xffffff for no color change
        this.shotColor = 0xffffff;
        //check if player is in range before firing
        this.fireRange = 200;
        this.shotSpeed = 100;
        //this is in milliseconds
        this.fireRate = 3000;

        this.changeDirectionInterval = 1000;
        this.movesFromTheStart = true;
        this.canBeStill = true;
        this.canMoveDiagonally = true;
        this.pointValue = 10;

        this.descendantStartMethod();
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("zombie-ice-idle", "zombie-ice-run");
    }
}