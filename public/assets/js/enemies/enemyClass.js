export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.health = 10;
        this.speed = 100;

        this.directionTracker = {
            up: false,
            down: false,
            right: false,
            left: false
        }
    }

    //returns true or false. Used in random functions
    coinFlip(){
        return 0.5 >= Math.random();
    }

    takeDamage(damage){
        this.health -= damage;

        if(this.health <= 0){
            defeated();
        }
    }

    defeated(){
        //TODO
    }

    //call on preUpdate
    manageMovement(idleAnimName, runAnimName){
        this.setVelocity(0, 0);

        if(this.directionTracker.up){
            this.setVelocityY(-this.speed);
            this.anims.play(runAnimName, true);
        }else if(this.directionTracker.down){
            this.setVelocityY(this.speed);
            this.anims.play(runAnimName, true);
        }

        if(this.directionTracker.right){
            this.setVelocityX(this.speed);
            this.anims.play(runAnimName, true);
        }else if(this.directionTracker.left){
            this.setVelocityX(-this.speed);
            this.anims.play(runAnimName, true);
        }

        if(!this.directionTracker.up &&
            !this.directionTracker.down &&
            !this.directionTracker.right &&
            !this.directionTracker.left){
                this.setVelocity(0, 0);
                this.anims.play(idleAnimName, true);
        }

        this.body.velocity.normalize().scale(this.speed)
    }
}