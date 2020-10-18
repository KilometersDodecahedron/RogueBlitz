import RandomlyMovingEnemy from "./randomlyMovingEnemy.js";

export default class FollowingZombieEnemy extends RandomlyMovingEnemy{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.dontChangeDirectionUntilTold = true;
        this.thePlayer;
        this.rayWall;

        //what range is needed to start chasing the player
        //NOTE: unlike ghost enemies, they won't stop until there's a wall between them and the player
        this.aquisitionRange = 150;
        //how often they check the player's position
        this.playerCheckInterval = 200;
        //this enemy is designed for jerky movement, randomly starting and stopping
        //it stops at different rates when chasing or not chasing the player
        this.randomMoveStopDuration = 250;
        this.chasingPlayerStopDuration = 100;
        //speed is multiplied by this number while shasing player
        this.chaseSpeedBonus = 1.2

        this.nextMoveTimer = 0;

        //how long enemy moves before stopping
        this.movementDuration = 200;

        this.isChasingPlayer = false;

        this.isMoving = false;

        this.isBetweenChecks = false;

        this.checkPlayerPositionEvent = Phaser.Time.TimerEvent;

        this.checkPlayerPositionEvent = scene.time.addEvent({
            delay: this.playerCheckInterval,
            callback: () => {
                this.checkIfPlayerInRange();
            },
            loop: true
        });
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        if(!this.thePlayer){
            return;
        }

        //tracks moving and stopping
        this.nextMoveTimer += deltaTime;

        //check if has finished moving
        if(this.isMoving && this.nextMoveTimer >= this.movementDuration){
            this.nextMoveTimer = 0;
            this.stopMoving();
            this.isMoving = false;
        }
        //start moving if not moving
        else if(!this.isMoving){
            //move faster when chasing player
            if(this.isChasingPlayer && this.nextMoveTimer >= this.chasingPlayerStopDuration){
                this.nextMoveTimer = 0;
                this.moveInGeneralDirectionOfPlayer(this.thePlayer);
                this.selfSpeedModifer = this.chaseSpeedBonus;
                this.isMoving = true;
            }
            else if(!this.isChasingPlayer && this.nextMoveTimer >= this.randomMoveStopDuration){
                this.nextMoveTimer = 0;
                this.setMovementInRandomDirection();
                this.selfSpeedModifer = 1;
                this.isMoving = true;
            }
        }
    }

    //stop triggering events when this object is gone
    preDestroy(){
        this.checkPlayerPositionEvent.destroy();
    }

    checkIfPlayerInRange(){
        if(Phaser.Math.Distance.Between(this.x, this.y, this.thePlayer.x, this.thePlayer.y)){
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.thePlayer.x, this.thePlayer.y);
            let wallHitCoordinates = this.rayWall.setAngle(angle).setOrigin(this.x, this.y).cast();

            if(Phaser.Math.Distance.Between(this.x, this.y, this.thePlayer.x, this.thePlayer.y) < 
            Phaser.Math.Distance.Between(this.x, this.y, wallHitCoordinates.x, wallHitCoordinates.y)){
                this.isChasingPlayer = true;
            }else{
                this.isChasingPlayer = false;
            }
        }
        else{
            this.isChasingPlayer = false;
        }
    }

    //run at start
    setSceneObjectsCallback(player, rayWall){
        //check if there's a wall between them and the player
        this.thePlayer = player;
        this.rayWall = rayWall;
    }
}