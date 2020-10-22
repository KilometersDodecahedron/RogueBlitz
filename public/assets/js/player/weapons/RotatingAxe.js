import Weapon from "./WeaponClass.js";

export default class RotatingAxe extends Weapon{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.damage = 10;
        this.knockback = 250;
        this.swingSpeed = 125;
        this.swingDuration = 190;

        this.scene.time.addEvent({
            delay: this.swingDuration,
            callback: () => {
                this.destroy();
            }
        });

        //position offset for direction
        this.axeOffsetX = 19;
        this.axeOffsetYUp = 17;
        this.axeOffsetYDown = 25;
        //position offest for swinging
        this.swingOffsetHorizontal = 5;
        this.swingOffsetHorizontalReverse = 12;
        this.swingOffsetVertical = 10;
        this.swingOffsetVerticalReverse = 10;

        this.horizontal = true;
        this.thePlayer;
    }
    //input this.lastKeyboardInput to get the direction to swing the axe
    callbackFunction(direction, player){
        this.thePlayer = player;
        this.body.onCollide = true;
        this.body.immovable = true;

        var x = player.x;
        var y = player.y;
        var backwards = false
        var verticle = false;
        var angle = 0

        //where to instantiate the axe
        switch(direction){
            case "right":
                this.horizontal = true;
                x += this.axeOffsetX;
                if(player.swingAxeUp){
                    y += this.swingOffsetHorizontalReverse;
                }else{
                    y -= this.swingOffsetHorizontal;
                }
                break;
            case "left":
                this.horizontal = true;
                x -= this.axeOffsetX;
                if(player.swingAxeUp){
                    y += this.swingOffsetHorizontalReverse;
                }else{
                    y -= this.swingOffsetHorizontal;
                }
                backwards = true;
                break;
            case "up":
                this.horizontal = false;
                y -= this.axeOffsetYUp;
                if(player.swingAxeUp){
                    x -= this.swingOffsetVerticalReverse;
                }else{
                    x += this.swingOffsetVertical;   
                }
                backwards = true;
                verticle = true;
                angle = 90;
                break;
            case "down":
                this.horizontal = false;
                y += this.axeOffsetYDown;
                if(player.swingAxeUp){
                    x -= this.swingOffsetVerticalReverse;
                }else{
                    x += this.swingOffsetVertical;   
                }
                verticle = true;
                angle = 90;
                break;
        }

        this.angle = angle;
        this.flipX = backwards;
        this.setPosition(x, y);

        if(verticle){
            this.body.setSize(9, 21);
        }

        this.setScale(1.2,1.2);
        
        //set direction to move axe, and face axe face that direction
        if(this.horizontal){
            if(player.swingAxeUp){
                this.setVelocityY(-this.swingSpeed);
                this.flipY = true;
            }else{
                this.setVelocityY(this.swingSpeed);
            }
        }else{
            if(player.swingAxeUp){
                this.setVelocityX(this.swingSpeed);
                this.flipY = true;
            }else{
                this.setVelocityX(-this.swingSpeed);
            }
        }
    }
}