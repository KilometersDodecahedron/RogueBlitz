export default class WarCry extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //list of stunned enemies so it doesn't reapply the stun
        this.stunnedEnemiesArray = [];
        this.yOffset = 4;
        this.xOffset = -1;

        this.visulaBurstCountdown = 250;
        this.visualDuration = 500;
        this.stunDuration = 5000;
        this.particleEmitter;

        //destroy it after it's done
        this.scene.time.addEvent({
            delay: this.visualDuration,
            callback: () => {
                this.particleEmitter.remove();
                this.destroy();
            }
        });

        //flashy effect when it finishes
        this.scene.time.addEvent({
            delay: this.visulaBurstCountdown,
            callback: () => {
                this.particleEmitter.explode(100);
            }
        });
    }

    warCryCallback(){
        this.alpha = 0;
        this.body.setCircle(64);
        this.setScale(1.2, 1.2)
        this.body.onCollide = true;
        this.x = this.scene.knight.x + this.xOffset;
        this.y = this.scene.knight.y + this.yOffset;
        //add warCryParticles to the scene if they don't already exist
        this.scene.warCryParticles = this.scene.add.particles('shouting-mouth');            

        this.particleEmitter = this.scene.warCryParticles.createEmitter({
            x: this.scene.knight.x + this.xOffset,
            y: this.scene.knight.y + this.yOffset,
            speed: 370,
            lifespan: 200,
            scale: { start: 0, end: 0.4 },
            quantity: 4.5
        });
    }

    stunEnemy(enemy){
        //check you haven't already stunned them
        if(this.stunnedEnemiesArray.indexOf(enemy) < 0){
            enemy.stunEnemy(this.stunDuration);
            this.stunnedEnemiesArray.push(enemy);
        }
    }
}