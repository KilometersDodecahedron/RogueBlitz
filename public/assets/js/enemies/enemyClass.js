import { sceneEvents } from "../events/eventCenter.js";
import { eventNames } from "../events/eventNames.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.health = 10;
        this.damage = 1;
        this.speed = 100;

        //points you get for defeating it
        this.pointValue = 10;

        this.takenDamageState = false;
        this.damageTime = 0;
        this.naturalTint = 0xffffff;

        //how far to knock back the player when they collide
        this.knockBack = 200;

        this.directionTracker = {
            up: false,
            down: false,
            right: false,
            left: false
        }
    }

    //for enemies that have had their base color changed
    callbackColorChange(){
        this.setTint(this.naturalTint);
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);
        if(this.takenDamageState){
            this.damageTime += deltaTime;
            // knockback period in milliseconds
            if(this.damageTime >= 200){
                this.takenDamageState = false;
                this.setTint(this.naturalTint);
                this.damageTime = 0;
            }
        }
    }

    //returns true or false. Used in random functions
    coinFlip(){
        return 0.5 >= Math.random();
    }

    takeDamage(damage, direction){
        if(this.takenDamageState){
            return;
        }

        this.health -= damage;
        console.log(this.health);

        if(this.health <= 0){
            this.defeated();
            return;
        }
        
        //change color
        this.setTint(0xff0000);
                    
        //knockback
        this.setVelocity(direction.x, direction.y);
        this.takenDamageState = true;
        this.damageTime = 0;
    }

    defeated(){
        //TODO
        sceneEvents.emit(eventNames.enemyDefeated, this.pointValue);
        this.destroy();
    }

    stopMoving(){
        this.directionTracker.up = false;
        this.directionTracker.down = false;
        this.directionTracker.right = false;
        this.directionTracker.left = false;
    }

    //only use if they can't move diagonally in this logical context
    setMoveUp(){
        this.directionTracker.up = true;
        this.directionTracker.down = false;
        this.directionTracker.right = false;
        this.directionTracker.left = false; 
    }

    setMoveDown(){
        this.directionTracker.up = false;
        this.directionTracker.down = true;
        this.directionTracker.right = false;
        this.directionTracker.left = false;
    }

    setMoveRight(){
        this.directionTracker.up = false;
        this.directionTracker.down = false;
        this.directionTracker.right = true;
        this.directionTracker.left = false;
    }

    setMoveLeft(){
        this.directionTracker.up = false;
        this.directionTracker.down = false;
        this.directionTracker.right = false;
        this.directionTracker.left = true;
    }

    //call on preUpdate
    manageMovement(idleAnimName, runAnimName){
        if(this.takenDamageState){
            this.anims.play(idleAnimName, true);
            return;
        }

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

        this.body.velocity.normalize().scale(this.speed);
    }
}