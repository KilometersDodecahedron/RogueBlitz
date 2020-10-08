import Enemy from "./enemyClass.js";

export default class FollowingGhostEnemy extends Enemy{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //distance the to the player before it starts following
        this.aquisitionRange = 150;
        //distance from a player before it stops following
        this.breakFollowRange = 175;
        //margin of error in finding x and y positions, to stop gittery movement
        this.positionErrorMargin = 10;

        this.isFollowingPlayer = true;

        this.thePlayer;
        this.distanceToPlayer = 0;
        
        //how often to check for the player's position
        this.playerCheckInterval = 250;
        this.directionCheckInterval = 500;
        this.playerCheckTimer = 0;
        this.isBetweenFrames = false;
    }

    //MUST BE RUN IN GROUP CALLBACK
    setPlayer(player){
        this.thePlayer = player;
        //get distance to the player
        this.distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.thePlayer.x, this.thePlayer.y);
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);
        if(!this.thePlayer ){
            return;
        }
        //start frame by seeing if it's time to check for the player's position
        if(this.isBetweenFrames){
            this.playerCheckTimer += deltaTime;
            //intervals for checking player position are different depending on whether you're in a chase
            if(!this.isFollowingPlayer && this.playerCheckTimer >= this.playerCheckInterval ||
                this.isFollowingPlayer && this.playerCheckTimer >= this.directionCheckInterval){
                this.isBetweenFrames = false;
                this.playerCheckTimer = 0;
            }
            //if so, get the distance to the player, and reset the check interval
        }else{
            this.distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.thePlayer.x, this.thePlayer.y);

            if(!this.isFollowingPlayer && this.distanceToPlayer <= this.aquisitionRange){
                this.isFollowingPlayer = true;
            }

            //follow the player if in range
            if(this.isFollowingPlayer){
                //check player is isn't outside break range
                if(this.distanceToPlayer <= this.breakFollowRange){
                    //determine movement based on player position
                    //move straight down if directly below
                    if(Math.abs(this.x - this.thePlayer.x) <= this.positionErrorMargin &&
                        this.y < this.thePlayer.y){
                            this.setMoveDown();
                    //move straight up if directly above
                    }else if(Math.abs(this.x - this.thePlayer.x) <= this.positionErrorMargin &&
                    this.y > this.thePlayer.y){
                        this.setMoveUp();
                    //move straight right
                    }else if(Math.abs(this.y - this.thePlayer.y) <= this.positionErrorMargin &&
                    this.x < this.thePlayer.x){
                        this.setMoveRight();
                    //move straight left
                    }else if(Math.abs(this.y - this.thePlayer.y) <= this.positionErrorMargin &&
                    this.x > this.thePlayer.x){
                        this.setMoveLeft();
                    }else{
                        //diagonal movement
                        if(this.x > this.thePlayer.x){
                            this.directionTracker.left = true;
                            this.directionTracker.right = false;
                        }else{
                            this.directionTracker.left = false;
                            this.directionTracker.right = true;
                        }

                        if(this.y > this.thePlayer.y){
                            this.directionTracker.up = true;
                            this.directionTracker.down = false;
                        }else{
                            this.directionTracker.up = false;
                            this.directionTracker.down = true;
                        }
                    }
                }
                //player is outside break range
                else{
                    this.isFollowingPlayer = false;
                    this.stopMoving();
                }
            }

            this.isBetweenFrames = true;
        }
    }
}