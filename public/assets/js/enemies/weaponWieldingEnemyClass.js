import { sceneEvents } from "../events/eventCenter.js";
import { eventNames } from "../events/eventNames.js";

import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class WeaponWieldingEnemy extends RandomlyMovingEnemy{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        this.thePlayer;
        //0 = RIGHT, 1 = DOWN, 2 = LEFT, 3 = UP
        this.rayCheck;

        //what number to checl against
        this.chechAgainstArray = [this.scene.sys.game.canvas.width, this.scene.sys.game.canvas.height, 0, 0]
        this.distanceErrorMargin = 3;
        //how close to the player before they attack
        this.rangeToAttack = 20; 

        //link it to the timer event counter from the game scene
        this.halfSecondsBetweenChecks = 12;
        this.currentHalfSeconds = 0;
    }

    weaponWieldingCallback(ray, player){
        //it'll attack enemies from the start
        this.currentHalfSeconds = this.halfSecondsBetweenChecks;

        //attack timer is linked to the scene timer
        sceneEvents.on(eventNames.halfSecondTimer, this.manageIncrementingAndAttacking, this);
        //turn off the event when the enemy is destroyed
        this.addMethodToRunWhenDefeated(() => {
            sceneEvents.off()
        });

        this.rayCheck = ray;
        this.thePlayer = player;
    }

    //linked to the half-second timer event
    manageIncrementingAndAttacking(){
        if(this.currentHalfSeconds < this.halfSecondsBetweenChecks){
            this.currentHalfSeconds++;
            console.log(this.currentHalfSeconds)
        }else{
            this.checkPlayerPosition()
            this.castRaysToCheckForPlayer();
        }
    }

    checkPlayerPosition(){
        console.log(this.position);
    }

    castRaysToCheckForPlayer(){
        for(let i = 0; i < 4; i++){
            this.rayCheck.setOrigin(this.x, this.y).setAngleDeg(90 * i);

            let hitCoordinates = this.rayCheck.cast();
            //console.log(hitCoordinates);

            //check if even, which means check the x axis
            if ( i % 2 == 0) {
                if(Math.abs(hitCoordinates.x - this.chechAgainstArray[i]) < this.distanceErrorMargin){
                    //console.log("miss " + Math.abs(hitCoordinates.x - this.chechAgainstArray[i]));
                }else{
                    //console.log("hit " + Phaser.Math.Distance.Between(this.x, this.y, hitCoordinates.x, hitCoordinates.y));
                    if(Phaser.Math.Distance.Between(this.x, this.y, hitCoordinates.x, hitCoordinates.y) < this.rangeToAttack){
                        this.attackWithWeapon(i);
                    }
                    return;
                }
            }
            //check vertical
            else{
                if(Math.abs(hitCoordinates.y - this.chechAgainstArray[i]) < this.distanceErrorMargin){
                    //console.log("miss " + Math.abs(hitCoordinates.y - this.chechAgainstArray[i]));
                }else{
                    //console.log("hit " + Phaser.Math.Distance.Between(this.x, this.y, hitCoordinates.x, hitCoordinates.y));
                    if(Phaser.Math.Distance.Between(this.x, this.y, hitCoordinates.x, hitCoordinates.y) < this.rangeToAttack){
                        this.attackWithWeapon(i);
                    }
                    return;
                }
            }

            
        }
    }

    attackWithWeapon(directionIndex){
        switch(directionIndex){
            case 0:
                console.log("attack right")
                this.currentHalfSeconds = 0;
                break;
            case 1:
                console.log("attack down")
                this.currentHalfSeconds = 0;
                break;
            case 2:
                console.log("attack left")
                this.currentHalfSeconds = 0;
                break;
            case 3:
                console.log("attack up")
                this.currentHalfSeconds = 0;
                break;
        }
    }
}