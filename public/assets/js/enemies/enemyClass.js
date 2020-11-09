import { sceneEvents } from "../events/eventCenter.js";
import { eventNames } from "../events/eventNames.js";

import TemporaryVisualEffectClass from "../effects/TemporaryVisualEffectClass.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.health = 10;
        this.damage = 1;
        this.speed = 100;

        //set scale of explosion when this enemy dies
        this.deathExplosionEffectScale = 0.8;
        
        //for enemies that move faster or slower under specific circumstances
        this.selfSpeedModifer = 1;

        //margin of error in finding x and y positions, to stop gittery movement
        this.positionErrorMargin = 10;

        //points you get for defeating it
        this.pointValue = 10;

        this.takenDamageState = false;
        this.damageTime = 0;
        this.naturalTint = 0xffffff;
        this.hitStunDiration = 200;
        //how far to knock back the player when they collide
        this.knockBack = 200;
        
        //bounce off the player after colliding with them
        this.bounceBackState = false;
        this.bounceTime = 0;
        this.bounceDuration = 200;
        //this value is used by the game script in the manage collision function
        this.bounceSpeed = 100;

        //checks to see if the enemy is stunned
        this.isStunned = false;
        this.stunnedTime = 0;

        //use addMethodToRunWhenDefeated to add to this
        this.onDeathFunctionArray = [];
        //use addMethodToRunAfterTakingDamage to add to this
        this.onTakeDamageFunctionArray = [];

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
        //manage knockback from player attacks
        if(this.takenDamageState){
            this.damageTime += deltaTime;
            // knockback period in milliseconds
            if(this.damageTime >= this.hitStunDiration){
                this.takenDamageState = false;
                this.setTint(this.naturalTint);
                this.damageTime = 0;
            }
        }

        //managed bounceback from hitting the player
        if(this.bounceBackState){
            this.bounceTime += deltaTime;
            // knockback period in milliseconds
            if(this.bounceTime >= this.bounceDuration){
                this.bounceBackState = false;
                this.bounceTime = 0;
            }
        }

        if(this.isStunned){
            this.stunnedTime -= deltaTime;
            if(this.stunnedTime <= 0){
                this.unStunEnemy();
            }
        }
    }

    //returns true or false. Used in random functions
    coinFlip(){
        return 0.5 >= Math.random();
    }

    stunEnemy(stunDuration){
        this.isStunned = true;
        this.stunnedTime = stunDuration;
        this.setTint(0x59597F);
        this.setVelocity(0, 0);
    }

    unStunEnemy(){
        this.isStunned = false;
        this.stunDuration = 0;
        this.setTint(this.naturalTint);
    }

    //called when enemy collides with player to bounce back a bit
    bounceOff(direction){
        this.bounceBackState = true;
        this.bounceTime = 0;
        this.setVelocity(-direction.x, -direction.y);
        this.unStunEnemy();
    }

    takeDamage(damage, direction){
        if(this.takenDamageState){
            return;
        }

        this.health -= damage;

        //run custom methods to run when taking damage
        if(this.onTakeDamageFunctionArray.length > 0){
            this.onTakeDamageFunctionArray.forEach(method => {
                method();
            });
        }

        if(this.health <= 0){
            this.defeated();
            return;
        }

        this.unStunEnemy();
        
        //change color
        this.setTint(0xff0000);
                    
        //knockback
        this.setVelocity(direction.x, direction.y);
        this.takenDamageState = true;
        this.damageTime = 0;
    }

    addMethodToRunAfterTakingDamage(method){
        this.onTakeDamageFunctionArray.push(method);
    }

    defeated(){
        //check for any on-death callbacks
        if(this.onDeathFunctionArray.length > 0){
            this.onDeathFunctionArray.forEach(element => {
                element();
            });
        }
        
        let explosion = new TemporaryVisualEffectClass({
            scene: this.scene,
            x: this.x,
            y: this.y,
            name: "explosion-sample",
            scale: this.deathExplosionEffectScale,
            alpha: 0.8
        });
        sceneEvents.emit(eventNames.enemyDefeated, this);
        this.destroy();
    }

    //called to tell it to do something specific when it dies
    addMethodToRunWhenDefeated(method){
        this.onDeathFunctionArray.push(method);
    }

    moveInGeneralDirectionOfPlayer(thePlayer){
        //determine movement based on player position
        //move straight down if directly below
        if(Math.abs(this.x - thePlayer.x) <= this.positionErrorMargin &&
            this.y < thePlayer.y){
                this.setMoveDown();
        //move straight up if directly above
        }else if(Math.abs(this.x - thePlayer.x) <= this.positionErrorMargin &&
        this.y > thePlayer.y){
            this.setMoveUp();
        //move straight right
        }else if(Math.abs(this.y - thePlayer.y) <= this.positionErrorMargin &&
        this.x < thePlayer.x){
            this.setMoveRight();
        //move straight left
        }else if(Math.abs(this.y - thePlayer.y) <= this.positionErrorMargin &&
        this.x > thePlayer.x){
            this.setMoveLeft();
        }else{
            //diagonal movement
            if(this.x > thePlayer.x){
                this.directionTracker.left = true;
                this.directionTracker.right = false;
            }else{
                this.directionTracker.left = false;
                this.directionTracker.right = true;
            }

            if(this.y > thePlayer.y){
                this.directionTracker.up = true;
                this.directionTracker.down = false;
            }else{
                this.directionTracker.up = false;
                this.directionTracker.down = true;
            }
        }
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
        if(this.takenDamageState || this.bounceBackState || this.isStunned){
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
            this.flipX = false;
            this.anims.play(runAnimName, true);
        }else if(this.directionTracker.left){
            this.setVelocityX(-this.speed);
            this.flipX = true;
            this.anims.play(runAnimName, true);
        }

        if(!this.directionTracker.up &&
            !this.directionTracker.down &&
            !this.directionTracker.right &&
            !this.directionTracker.left){
                this.setVelocity(0, 0);
                this.anims.play(idleAnimName, true);
        }

        this.body.velocity.normalize().scale(this.speed * this.selfSpeedModifer);
    }
}