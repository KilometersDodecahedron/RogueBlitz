//returns true or false
const coinFlip = () => {
    return 0.5 >= Math.random();
}

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, health, speed){
        super(scene, x, y, texture, frame);
        this.health = 10;
        this.speed = 100;
        //determine movement constraints
        this.canBeStill = true;
        this.canMoveDiagonally =false;

        this.directionTracker = {
            up: false,
            down: false,
            right: false,
            left: false
        }
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

    //set their movement them in a random direction
    //
    setMovementInRandomDirection(){
        //set random movement
        if(this.canMoveDiagonally){
            this.directionTracker.up = coinFlip();
            this.directionTracker.down = coinFlip();
            this.directionTracker.right = coinFlip();
            this.directionTracker.left = coinFlip();
        //if they can't move diagonally
        }else{
            if(coinFlip()){
                this.directionTracker.up = false;
                this.directionTracker.down = false;
                this.directionTracker.right = coinFlip();
                this.directionTracker.left = coinFlip();
            }else{
                this.directionTracker.up = coinFlip();
                this.directionTracker.down = coinFlip();
                this.directionTracker.right = false;
                this.directionTracker.left = false;
            }
        }

        //prevent conflicting movement instructions
        if(this.directionTracker.up && this.directionTracker.down){
            coinFlip() ? this.directionTracker.up = false : this.directionTracker.down = false;
        }
        if(this.directionTracker.right && this.directionTracker.left){
            coinFlip() ? this.directionTracker.right = false : this.directionTracker.left = false;
        }

        //force it move in a random direction if it's not allowed to stay still
        if(!this.canBeStill && 
            !this.directionTracker.up &&
            !this.directionTracker.down &&
            !this.directionTracker.right &&
            !this.directionTracker.left){
            if(this.canMoveDiagonally){
                this.directionTracker.up = coinFlip();
                this.directionTracker.down = !this.directionTracker.up;
                this.directionTracker.right = coinFlip();
                this.directionTracker.left = !this.directionTracker.right;
            }else{
                if(coinFlip()){
                    this.directionTracker.up = false;
                    this.directionTracker.down = false;
                    this.directionTracker.right = coinFlip();
                    this.directionTracker.left = !this.directionTracker.right;
                }else{
                    this.directionTracker.up = coinFlip();
                    this.directionTracker.down = !this.directionTracker.up;
                    this.directionTracker.right = false;
                    this.directionTracker.left = false;
                }
            }
        }
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