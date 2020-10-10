import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class ShootingEnemy extends RandomlyMovingEnemy{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //set the projectile from the game scene
        this.projectile;
        this.projectileName;

        this.shotDamage = 1;
        this.shotKnockback = 50;
        //check if player is in range before firing
        this.fireRange = 200;
        this.shotSpeed = 100;
        //this is in milliseconds
        this.fireRate = 3000;
        this.checkPlayerRate = 200;
        this.fireTimer = 0;
        this.checkTimer = 0;
        //used in preUpdate to see if should increment
        this.isBetweenFrames = false;
        this.weaponIsRechargingState = false;

        this.thePlayer;
        //used to check if there's a wall between them and the player
        this.rayPlayer;
        this.rayWall;
        //this gets passed into projectile so it can access the physics of the scene
        this.currentScene;
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);
        //makes sure weapon does not fire more than the fire rate
        if(this.weaponIsRechargingState){
            this.fireTimer += deltaTime;
            if(this.fireTimer >= this.fireRate){
                this.weaponIsRechargingState = false;
                this.fireTimer = 0;
            }
        }

        if(this.isBetweenFrames){
            this.checkTimer += deltaTime;
            if(this.checkTimer >= this.checkPlayerRate){
                this.isBetweenFrames = false;
                this.checkTimer = 0;
            }
        }
        //check for the player if not between checks
        else{
            this.checkIfPlayerIsInRange()
        }
    }

    //CALLBACK
    setProjectileAndPlayerAndRayAndScene(projectile, player, rayPlayer, rayWall, scene, projectileName){
        this.projectile = projectile;
        this.thePlayer = player;
        this.rayPlayer = rayPlayer;
        this.rayWall = rayWall;
        this.currentScene = scene;
        this.projectileName = projectileName;
        console.log(scene);
    }

    checkIfPlayerIsInRange(){
        //resetting the check
        this.isBetweenFrames = true;
        //check if player is in range, so you're not firing from off screen
        if(Phaser.Math.Distance.Between(this.x, this.y, this.thePlayer.x, this.thePlayer.y) <= this.fireRange &&
            !this.weaponIsRechargingState){
            //angle from enemy to player
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.thePlayer.x, this.thePlayer.y);
            let playerHitCoordinates = this.rayPlayer.setAngle(angle).setOrigin(this.x, this.y).cast();
            let wallHitCoordinates = this.rayWall.setAngle(angle).setOrigin(this.x, this.y).cast();

            if(Phaser.Math.Distance.Between(this.x, this.y, this.thePlayer.x, this.thePlayer.y) <
            Phaser.Math.Distance.Between(this.x, this.y, wallHitCoordinates.x, wallHitCoordinates.y)){
                this.fireProjectile(angle, this.shotSpeed, this.shotDamage, this.shotKnockback, this.currentScene);
            }
        }
    }

    fireProjectile(angle, speed, damage, knockback, scene){
        this.weaponIsRechargingState = true;
        this.stopMoving();
        const projectile = this.projectile.get(this.x, this.y, this.projectileName);
        projectile.fireProjectile(angle, speed, damage, knockback, scene);
        projectile.body.onCollide = true;
        projectile.setScale(0.07, 0.07).setCircle(100);
        projectile.anims.play("energy-ball", true);
        this.currentScene.physics.velocityFromRotation(angle, speed, projectile.body.velocity);
        //toDo spawn the projectile and pass in the scene info
    }
}