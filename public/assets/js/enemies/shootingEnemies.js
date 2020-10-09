import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class ShootingEnemy extends RandomlyMovingEnemy{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //set the projectile from the game scene
        this.projectile;

        this.shotDamage = 1;
        //check if player is in range before firing
        this.fireRange = 200;
        this.shotSpeed = 100;
        //this is in milliseconds
        this.fireRate = 3000;

        this.thePlayer;
    }

    //CALLBACK
    setProjectileAndPlayer(projectile, player){
        this.projectile = projectile;
        this.thePlayer = player;
    }
}