import RotatingAxe from "../weapons/RotatingAxe.js";
import { sceneEvents } from "../../events/eventCenter.js";
import { eventNames } from "../../events/eventNames.js";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        this.health = 8;
        this.attackDamage = 5; 
        this.speed = 125;

        this.knives;
        this.axes = this.scene.physics.add.group({
            classType: RotatingAxe,
            createCallback: (gameobject) => {
                gameobject.callbackFunction(this.lastKeyboardInput, this);
            }
        });
        
        //key for swinging th axe
        this.axeKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        this.swingAxeUp = false;
        this.swingDuration = 150;
        this.swingTimer = 0;
        this.isSwinging = false;

        this.axeCooldown = 2000;
        this.axeTimer = 0;
        this.maxSwingChanges = 4;
        this.swingCount = 0;

        this.throwSpeedFast = 300;
        this.throwKnockbackFast = 100;

        //get direction player is pushing keys for attack directions
        this.diectionInputHolder = {
            up: false,
            down: false,
            right: false,
            left: false,
        }

        this.lastKeyboardInput = "right";

        //used to stop player while attacking
        this.attackTimer = 0;
        this.attackingState = false;

        //used for invincibility frames and knockback
        this.takenDamageState = false;
        this.damageTime = 0;
        this.isDead = false;
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        if(this.takenDamageState){
            this.damageTime += deltaTime;
            // knockback period in milliseconds
            if(this.damageTime >= 200){
                this.takenDamageState = false;
                this.setTint(0xffffff);
                this.damageTime = 0;
            }
        }

        //stunned after attacking
        if(this.attackingState){
            this.attackTimer += deltaTime;
            if(this.attackTimer >= 150){
                this.attackingState = false;
                this.attackTimer = 0;
            }
        }

        if(this.isSwinging){
            this.swingTimer += deltaTime;
            if(this.swingTimer >= this.swingDuration){
                this.isSwinging = false;
                this.swingTimer = 0;
            }
        }

        if(this.swingCount > 0){
            this.axeTimer += deltaTime;
            if(this.axeTimer >= this.axeCooldown){
                this.axeTimer = 0;
                this.swingCount--;
                sceneEvents.emit(eventNames.weaponChargeChanged, this.swingCount, this);
            }
        }
    }

    update(cursors){

        //do nothing if can't find controls or player
        if(!cursors || this.takenDamageState || this.isDead || this.attackingState || this.isSwinging){
            return;
        }

        this.managePlayerMovement(cursors);
        this.manageAttacking(cursors);
    }

    setKnives(knives){
        this.knives = knives;
    }

    takeDamage(direction, damage){
        //stop running takeDamage if already dead
        if(this.health <= 0){
            return;
        }

        //make sure you won't take damage during knockback
        if(!this.takenDamageState){
            this.health -= damage;
            this.anims.play("knight-hit", true);

            //if you're dead, don't bother with knockback
            if(this.health <= 0){
                this.die();
                return;
            }

            //change color
            this.setTint(0xff0000);
                    
            //knockback
            this.setVelocity(direction.x, direction.y);
            this.takenDamageState = true;
            this.damageTime = 0;
        }
    }

    manageAttacking(cursors){
        if(Phaser.Input.Keyboard.JustDown(cursors.space)){
            //get the direction the player is pointing
            if(cursors.left.isDown){
                this.diectionInputHolder.left = true;
                this.diectionInputHolder.right = false;
            }else if(cursors.right.isDown){
                this.diectionInputHolder.left = false;
                this.diectionInputHolder.right = true;
            }else{
                this.diectionInputHolder.left = false;
                this.diectionInputHolder.right = false;
            }

            if(cursors.up.isDown){
                this.diectionInputHolder.up = true;
                this.diectionInputHolder.down = false;
            }else if(cursors.down.isDown){
                this.diectionInputHolder.up = false;
                this.diectionInputHolder.down = true;
            }else{
                this.diectionInputHolder.up = false;
                this.diectionInputHolder.down = false;
            }

            this.throwKnife();
        }
        //axe attack
        else if(this.axeKey.isDown && this.swingCount < this.maxSwingChanges){
            this.rotatingAxes()
        }
    }

    rotatingAxes(){
        this.swingCount++;
        this.axeTimer = 0;
        sceneEvents.emit(eventNames.weaponChargeChanged, this.swingCount, this);

        const axe = this.axes.get(this.x, this.y, "axe");
        this.setVelocity(0, 0);
        this.anims.play("knight-idle", true);
        this.swingDuration = axe.swingDuration;
        this.isSwinging = true;
        this.swingAxeUp = !this.swingAxeUp;
    }

    throwKnife(){
        if(!this.knives){
            console.log("no knives");
            return;
        }
        this.attackingState = true; 
        this.setVelocity(0, 0);
        this.anims.play("knight-idle", true);

        const data = this.getAttackAngle();
        
        const knife = this.knives.get(this.x, this.y + 7, "knife");
        knife.setRotation(data.angle);
        knife.damage = this.attackDamage;
        knife.knockback = this.throwKnockbackFast;

        knife.setVelocity(data.vector.x * this.throwSpeedFast, data.vector.y * this.throwSpeedFast);
        knife.body.velocity.normalize().scale(this.throwSpeedFast);

        if(this.diectionInputHolder.up || this.diectionInputHolder.down || this.lastKeyboardInput == 'down' || this.lastKeyboardInput == 'up'){
            knife.body.setSize(4, 6);
        }else{
            knife.body.setSize(6, 4);
        }
    }

    //used by attacks to get their angles
    getAttackAngle(){
        const vector = new Phaser.Math.Vector2(0 ,0);

        if(this.diectionInputHolder.left && this.diectionInputHolder.up){
            vector.x = -1;
            vector.y = -1;
        }else if(this.diectionInputHolder.right && this.diectionInputHolder.up){
            vector.x = 1;
            vector.y = -1;
        }else if(this.diectionInputHolder.left && this.diectionInputHolder.down){
            vector.x = -1;
            vector.y = 1;
        }else if(this.diectionInputHolder.right && this.diectionInputHolder.down){
            vector.x = 1;
            vector.y = 1;
        }else if(this.diectionInputHolder.left){
            vector.x = -1;
        }else if(this.diectionInputHolder.right){
            vector.x = 1;
        }else if(this.diectionInputHolder.up || this.lastKeyboardInput == "up"){
            vector.y = -1;
        }else if(this.diectionInputHolder.down || this.lastKeyboardInput == "down"){
            vector.y = 1;
        }else if(this.flipX){
            vector.x = -1;
        }else{
            vector.x = 1;
        }

        const angle = vector.angle();
        return {
            angle: angle,
            vector: vector
        };
    }

    die(){
        this.setVelocity(0, 0);
        //make sure tombstone is facing the right way
        this.flipX = false;
        //the tobstone sprite is larger, so shrink it
        this.setScale(0.09, 0.09);
        this.anims.play("tombstone");
        //prevent collisions when the character dies
        this.body.destroy();
        this.isDead = true;
    }

    managePlayerMovement(cursors){
        //stop movement from previous frame
        this.setVelocity(0, 0);

        //horizontal movement
        if(cursors.left?.isDown){
            this.setVelocityX(-this.speed);
            this.lastKeyboardInput = "left";
        }else if(cursors.right?.isDown){
            this.setVelocityX(this.speed);
            this.lastKeyboardInput = "right";
        }

        if(cursors.up?.isDown){
            this.setVelocityY(-this.speed);
            this.lastKeyboardInput = "up";
        }else if(cursors.down?.isDown){
            this.setVelocityY(this.speed);
            this.lastKeyboardInput = "down";
        }

        this.body.velocity.normalize().scale(this.speed);

        //knight animation
        if(cursors.left.isDown){
            this.flipX = true;
            this.anims.play("knight-run", true);
        }else if(cursors.right.isDown){
            this.flipX = false;
            this.anims.play("knight-run", true);
        }else if(cursors.up.isDown || cursors.down.isDown){
            this.anims.play("knight-run", true);
        }else{
            this.anims.play("knight-idle", true);
        }
    }
}


//can now create this object with the this.add method
Phaser.GameObjects.GameObjectFactory.register("player", function (phaser, x, y, texture, frame){
    var player = new Player(phaser.scene, x, y, texture, frame);

    this.displayList.add(player);
    this.updateList.add(player);

    this.scene.physics.world.enableBody(player, Phaser.Physics.Arcade.DYNAMIC_BODY);

    //set their collider properly
    player.body.setSize(14, 20).setOffset(0, 8);

    return player;
});