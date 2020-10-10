//you're getting Phaser from the cdn

//used to test collision boundaries
import debugDraw from "../utils/debug.js";

//import animations stored in separate files
import { createGoblinAnims, createOgreAnims, createDemonAnims, createNecromancerAnims, createOozeSwampyAnims, createOozeMuddyAnims, createEnergyBallAnims, createZombieIceAnims, createSkeletonAnims, createZombieAnims, createOrcMaskedAnims, createDemonBigAnims, createDemonSmallAnims} from "../anims/enemyAnims.js";
import { createPlayerAnims } from "../anims/playerAnims.js";

//import enemies
import Goblin from "../enemies/goblin.js";
import Ogre from "../enemies/ogre.js";
import Demon from "../enemies/demon.js";
import Necromancer from "../enemies/necromancer.js";
import OozeSwampy from "../enemies/oozeSwampy.js";
import OozeMuddy from "../enemies/oozeMuddy.js";
import ZombieIce from "../enemies/zombieIce.js";
import EnemyProjectile from "../enemies/attacks/enemyProjectile.js";
import Skeleton from "../enemies/skeleton.js";
import Zombie from "../enemies/zombie.js";
import OrcMasked from "../enemies/orc-masked.js";
import DemonBig from "../enemies/demonBig.js";
import DemonSmall from "../enemies/demonSmall.js";

//import Player
import "../player/class/playerClass.js";
import Weapon from "../player/weapons/WeaponClass.js"

//events
import { sceneEvents } from "../events/eventCenter.js";
import { eventNames } from "../events/eventNames.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
        //player character
        this.knight = undefined;
        //arrow keys and space bar get stored in here
        this.cursors = undefined;
        //store refernce to the collider so it can be deleted when player dies
        this.playerEnemyCollisionArray = [];
        //make sure enemies don't spawn on top of player
        this.minimumSpawnDistance = 80;
        //track the player's score
        this.score = 0;
        this.gameUI;
        //how many points you need before stronger enemies spawn
        this.enemyStrengthScoreThreshold = [100, 300, 700, 1500, 3000];
        //these 3 variables manage enemy spawning
        this.spawningThreshold = 40000;
        this.enemyDeathTimerReduction = 5000;
        this.currentSpawingTimer = 0;
        //how many enemies spawn each time
        this.enemiesInWave = 5;
        //make sure enemies don't spawn if too many are on the screen
        this.currentEnemyCount = 0;
        this.maxEnemyCount = 30;
        //store group objects for enemies in here
        //the tier says how strong they are
        //they store OBJECTS, 3 properties, first is the group, second the name, third is the SPAWNING POINT TYPE
        this.enemiesTierOne = [];
        this.enemiesTierTwo = [];
        this.enemiesTierThree = [];
        this.enemiesTierFour = [];
        this.enemiesTierFive = [];
        this.enemiesTierSix = [];
        //raycaster
        this.playerCheckRaycaster;
        this.wallCheckRaycaster
        this.playerCheckRay;
        this.wallCheckRay;
        //indexes of the tiles in the json file of the sprite sheet that are walls
        this.wallTileIndexes = [225,3,226,257,35,258,228,291,292,259,260,227,323,324];
        //store the event here that goes off every 500 milliseconds. It's more data efficient than update for timers
        this.halfSecondTimerEvent = Phaser.Time.TimerEvent;
    }

    preload() {
        //set the arrow keys and space bar to the cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        //add health bar
        this.gameUI = this.scene.run('game-ui');

        //add animations
        createPlayerAnims(this.anims);
        createGoblinAnims(this.anims);
        createOgreAnims(this.anims);
        createDemonAnims(this.anims);
        createNecromancerAnims(this.anims);
        createOozeSwampyAnims(this.anims);
        createOozeMuddyAnims(this.anims);
        createEnergyBallAnims(this.anims);
        createZombieIceAnims(this.anims);
        createSkeletonAnims(this.anims);
        createZombieAnims(this.anims);
        createOrcMaskedAnims(this.anims);
        createDemonBigAnims(this.anims);
        createDemonSmallAnims(this.anims);

        const map = this.make.tilemap({key: 'dungeon'});
        
        //extra numbers are because tileset was "extruded" tile-extruder too make them fit together better
        const tileset = map.addTilesetImage("dungeonPack", 'tiles', 16, 16, 1, 2);
        
        //create the floor
        //not storing the Floor layer in a variable, since it won't need to do anything
        map.createStaticLayer("Floor", tileset);
        //store walls in layer to give them properties
        const wallsLayer = map.createStaticLayer("Walls", tileset);
        
        //give walls collision
        wallsLayer.setCollisionByProperty({collides: true});

        //get enemy spawn points
        const solidEnemySpawnPoints = map.getObjectLayer("Solid Enemies");
        const phasingEnemySpawnPoints = map.getObjectLayer("Phasing Enemies");

        //FOR DEBUGGING
        //debugDraw.debugDraw(wallsLayer, this);

        //create knives for player to throw
        const knives = this.physics.add.group({
            classType: Weapon,
            createCallback: (gameObject) => {
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        })
        
        //add the knight
        this.knight = this.add.player(this.scene, 200, 200, "knight");
        this.knight.setKnives(knives);

        //create raycasters for shooting enemies
        this.playerCheckRaycaster = this.raycasterPlugin.createRaycaster();
        this.wallCheckRaycaster = this.raycasterPlugin.createRaycaster();
        this.playerCheckRaycaster.mapGameObjects(this.knight);
        this.wallCheckRaycaster.mapGameObjects(wallsLayer, false, {collisionTiles: this.wallTileIndexes });
        //these get passed into the shooting enemies
        this.playerCheckRay = this.playerCheckRaycaster.createRay();
        this.wallCheckRay = this.wallCheckRaycaster.createRay();

        //set camera area
        this.cameras.main.setBounds(0, 0, 800, 560);
        //have it follow the knight
        this.cameras.main.startFollow(this.knight, true, 1, 1, 0, 0);
        //set camera zoom
        this.cameras.main.setZoom(2.5);
    
        //projectile enemies shoots these 
        const energyBall = this.physics.add.group({
            classType: EnemyProjectile,
        });

        const zombieIce = this.physics.add.group({
            classType: ZombieIce,
            createCallback: (gameObject) => {
                gameObject.body.onCollide = true;
                gameObject.setProjectileAndPlayerAndRayAndScene(energyBall, this.knight, this.playerCheckRay, this.wallCheckRay, this, "energy-ball");
            }
        });
        this.enemiesTierOne.push({group: zombieIce, name: "zombie-ice", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierTwo.push({group: zombieIce, name: "zombie-ice", spawnLayer: solidEnemySpawnPoints});
        
        const goblins = this.physics.add.group({
            classType: Goblin,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(10, 10).setOffset(4, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        this.enemiesTierOne.push({group: goblins, name: "goblin", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierTwo.push({group: goblins, name: "goblin", spawnLayer: solidEnemySpawnPoints});

        const ogres = this.physics.add.group({
            classType: Ogre,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(20, 25).setOffset(7, 7);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        this.enemiesTierFive.push({group: ogres, name: "ogre", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierSix.push({group: ogres, name: "ogre", spawnLayer: solidEnemySpawnPoints});

        const demons = this.physics.add.group({
            classType: Demon,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 20).setOffset(2, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        this.enemiesTierThree.push({group: demons, name: "demon", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierFour.push({group: demons, name: "demon", spawnLayer: solidEnemySpawnPoints});


        const necromancers = this.physics.add.group({
            classType: Necromancer,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 20).setOffset(2, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
                gameObject.setProjectileAndPlayerAndRayAndScene(energyBall, this.knight, this.playerCheckRay, this.wallCheckRay, this, "energy-ball");
            }
        });
        this.enemiesTierSix.push({group: necromancers, name: "necromancer", spawnLayer: solidEnemySpawnPoints});

        const oozeSwampy = this.physics.add.group({
            classType: OozeSwampy,
            createCallback: (gameObject) => {
                gameObject.body.collideWorldBounds=true;
                gameObject.body.onCollide = true;
                gameObject.setPlayer(this.knight);
            }
        })
        this.enemiesTierFour.push({group: oozeSwampy, name: "ooze-swampy", spawnLayer: phasingEnemySpawnPoints});
        this.enemiesTierFive.push({group: oozeSwampy, name: "ooze-swampy", spawnLayer: phasingEnemySpawnPoints});
        this.enemiesTierSix.push({group: oozeSwampy, name: "ooze-swampy", spawnLayer: phasingEnemySpawnPoints});

        const oozeMuddy = this.physics.add.group({
            classType: OozeMuddy,
            createCallback: (gameObject) => {
                gameObject.body.collideWorldBounds=true;
                gameObject.body.onCollide = true;
                gameObject.setPlayer(this.knight);
                gameObject.callbackColorChange();
            }
        })
        this.enemiesTierFive.push({group: oozeMuddy, name: "ooze-muddy", spawnLayer: phasingEnemySpawnPoints});
        this.enemiesTierSix.push({group: oozeMuddy, name: "ooze-muddy", spawnLayer: phasingEnemySpawnPoints});

        const skeletons = this.physics.add.group({
            classType: Skeleton,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 15).setOffset(2, 1);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        this.enemiesTierOne.push({group: skeletons, name: "skeleton", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierTwo.push({group: skeletons, name: "skeleton", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierThree.push({group: skeletons, name: "skeleton", spawnLayer: solidEnemySpawnPoints});

        const zombies = this.physics.add.group({
            classType: Zombie,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 15).setOffset(2, 2);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        this.enemiesTierTwo.push({group: zombies, name: "zombie", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierThree.push({group: zombies, name: "zombie", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierFour.push({group: zombies, name: "zombie", spawnLayer: solidEnemySpawnPoints});

        const orcMaskeds = this.physics.add.group({
            classType: OrcMasked,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 17).setOffset(2, 2);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        this.enemiesTierThree.push({group: orcMaskeds, name: "orc-masked", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierFour.push({group: orcMaskeds, name: "orc-masked", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierFive.push({group: orcMaskeds, name: "orc-masked", spawnLayer: solidEnemySpawnPoints});
        

        const demonBigs = this.physics.add.group({
            classType: DemonBig,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(22, 30).setOffset(5, 7);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        this.enemiesTierFive.push({group: demonBigs, name: "demon-big", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierSix.push({group: demonBigs, name: "demon-big", spawnLayer: solidEnemySpawnPoints});
        
        const demonSmalls = this.physics.add.group({
            classType: DemonSmall,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(10, 12).setOffset(4, 2);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
        this.enemiesTierOne.push({group: demonSmalls, name: "demon-small", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierTwo.push({group: demonSmalls, name: "demon-small", spawnLayer: solidEnemySpawnPoints});

        //update score when enemy is defeated
        sceneEvents.on(eventNames.enemyDefeated, this.handleEnemyDefeated, this);
        //count timer
        sceneEvents.on(eventNames.halfSecondTimer, this.countTowardsEnemySpawn, this);

        //runs every half a second for time-related stuff, to avoid using update
        this.halfSecondTimerEvent = this.time.addEvent({
            delay: 500,
            callback: () => {
                sceneEvents.emit(eventNames.halfSecondTimer);
            },
            loop: true
        })

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(eventNames.enemyDefeated, this.handleEnemyDefeated, this);
            sceneEvents.off(eventNames.halfSecondTimer, this.countTowardsEnemySpawn, this);
            this.scene.stop("game-ui");
            this.halfSecondTimerEvent.destroy();
        })

        this.physics.add.collider(this.knight, wallsLayer);
        this.physics.add.collider(goblins, wallsLayer);
        this.physics.add.collider(ogres, wallsLayer);
        this.physics.add.collider(demons, wallsLayer);
        this.physics.add.collider(necromancers, wallsLayer);
        this.physics.add.collider(zombieIce, wallsLayer);
        this.physics.add.collider(skeletons, wallsLayer);
        this.physics.add.collider(zombies, wallsLayer);
        this.physics.add.collider(orcMaskeds, wallsLayer);
        this.physics.add.collider(demonBigs, wallsLayer);
        this.physics.add.collider(demonSmalls, wallsLayer);

        //knives hit walls
        this.physics.add.collider(knives, wallsLayer, this.handleProjectileWallCollision, undefined, this);
        this.physics.add.collider(energyBall, wallsLayer, this.handleProjectileWallCollision, undefined, this);

        //weapon collisions
        this.physics.add.collider(knives, goblins, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, ogres, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, demons, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, necromancers, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, oozeSwampy, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, oozeMuddy, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, zombieIce, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, skeletons, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, zombies, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, orcMaskeds, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, demonBigs, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, demonSmalls, this.handleProjectileHit, undefined, this);

        //stores all the enemy collisions in an array, to be deleted when the player dies
        this.playerEnemyCollisionArray.push(this.physics.add.collider(goblins, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(ogres, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(demons, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(necromancers, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(oozeSwampy, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(oozeMuddy, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(zombieIce, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(skeletons, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(zombies, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(orcMaskeds, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(demonBigs, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(demonSmalls, this.knight, this.handleEnemyCollisions, undefined, this));

        //enemy projectiles hit player
        this.playerEnemyCollisionArray.push(this.physics.add.collider(energyBall, this.knight, this.handleEnemyProjectileHit, undefined, this));

        this.spawnNewSetOfEnemies();
    }

    handleProjectileHit(projectile, enemy){
        let directionX = this.knight.x - enemy.x;
        let directionY = this.knight.y - enemy.y;

        let directionalVector = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(-projectile.knockback);

        enemy.takeDamage(projectile.damage, directionalVector);
        projectile.destroy();
    }

    handleEnemyProjectileHit(player, projectile){
        let directionX = player.x - projectile.x;
        let directionY = player.y - projectile.y;

        let directionalVector = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(projectile.knockback);
    
        this.knight.takeDamage(directionalVector, projectile.damage);

        sceneEvents.emit(eventNames.playerHealthChanged, this.knight.health);

        //stops
        if(player.health <= 0){
            this.playerEnemyCollisionArray = [];
        }

        projectile.destroy();
    }

    handleProjectileWallCollision(projectile, wall){
        projectile.destroy();
    }

    //for when the player collides with an enemy
    handleEnemyCollisions(player, enemy){
        let directionX = player.x - enemy.x;
        let directionY = player.y - enemy.y;

        let directionalVector = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(enemy.knockBack);

        this.knight.takeDamage(directionalVector, enemy.damage);

        sceneEvents.emit(eventNames.playerHealthChanged, this.knight.health);

        //stops
        if(player.health <= 0){
            this.playerEnemyCollisionArray = [];
            //delay before going to game over screen
            this.time.addEvent({
                delay: 3000,
                callback: () => {
                    this.gameOver()
                }
            })
        }
    }

    gameOver(){
        this.scene.start("gameOverScreen")
    }

    //called as an event
    handleEnemyDefeated(points){
        this.score += points;
        this.currentSpawingTimer += this.enemyDeathTimerReduction;
        this.currentEnemyCount -= 1;
        sceneEvents.emit(eventNames.scoreUpdated, this.score)
    }

    spawnNewSetOfEnemies(){
        //store array of the current 
        var selectedEnemyArray;
        //pick which enemy array to use
        if(this.score < this.enemyStrengthScoreThreshold[0]){
            selectedEnemyArray = this.enemiesTierOne;
        }else if(this.score < this.enemyStrengthScoreThreshold[1]){
            selectedEnemyArray = this.enemiesTierTwo;
        }else if(this.score < this.enemyStrengthScoreThreshold[2]){
            selectedEnemyArray = this.enemiesTierThree;
        }else if(this.score < this.enemyStrengthScoreThreshold[3]){
            selectedEnemyArray = this.enemiesTierFour;
        }else if(this.score < this.enemyStrengthScoreThreshold[4]){
            selectedEnemyArray = this.enemiesTierFive;
        }else{
            selectedEnemyArray = this.enemiesTierSix;
        }
        
        //spawn an enemy for each it tells you to
        for(let i = 0; i < this.enemiesInWave; i++){
            selectedEnemyArray = this.randomArrayShuffle(selectedEnemyArray);
            this.spawnInRandomPosition(selectedEnemyArray[0].group, selectedEnemyArray[0].name, selectedEnemyArray[0].spawnLayer);
        }

        this.currentSpawingTimer = 0;
    }

    //get the position to spawn
    spawnInRandomPosition(enemyType, enemyName, positionObjectLayer){
        //randomize order
        const shuffledArray = this.randomArrayShuffle(positionObjectLayer.objects);

        //check spawn point is far enough from player
        for(let i = 0; i < shuffledArray.length; i++){
            let distance = Phaser.Math.Distance.Between(shuffledArray[i].x, shuffledArray[i].y, this.knight.x, this.knight.y);
            if(distance >= this.minimumSpawnDistance){
                this.spawnEnemy(enemyType, enemyName, shuffledArray[i]);
                break;
            }
        }
    }

    //spawns an enemy
    spawnEnemy(enemyType, enemyName, enemySpawnPositionObject){
        //enemySpawnPositionObject is offset by half the height and width to accomidate for Tiled positioning issues
        let newEnemy = enemyType.get(enemySpawnPositionObject.x + (enemySpawnPositionObject.width * 0.5), 
            enemySpawnPositionObject.y - (enemySpawnPositionObject.height * 0.5), enemyName);
        this.currentEnemyCount += 1;
    }

    countTowardsEnemySpawn(){
        this.currentSpawingTimer += 500;

        //it will only spawn new enemies if the player is alive, and enemy count is not at max
        if(!this.knight.isDead && this.currentEnemyCount < this.maxEnemyCount){
            if(this.currentSpawingTimer >= this.spawningThreshold){
                this.spawnNewSetOfEnemies();
            }
        }
    }

    //used to help randomize spawn areas
    randomArrayShuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    }

    update(time, deltaTime){
        if(this.knight){
            this.knight.update(this.cursors);
        }
    }
}