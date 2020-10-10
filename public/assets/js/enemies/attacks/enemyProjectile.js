export default class EnemyProjectile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.damage = 1;
        this.knockback = 200;
        this.angle = 1;
        this.speed = 140;
        this.currentScene;
    }

    //run from callback to get the projectile moving
    fireProjectile(angle, speed, damage, knockback, scene){
        this.damage = damage;
        this.knockback = knockback;
        this.currentScene = scene;
        this.angle = angle;
        this.speed = speed;  
    }

    giveVelocityCallback(){
        // this.currentScene.physics.velocityFromRotation(angle, speed, this.body.velocity);
        console.log(this.currentScene);
    }
}