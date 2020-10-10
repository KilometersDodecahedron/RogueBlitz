//you're getting Phaser from the cdn

//used to test collision boundaries
import debugDraw from "../utils/debug.js";

//import animations stored in separate files
<<<<<<< Updated upstream
import { createGoblinAnims, createOgreAnims, createDemonAnims, createNecromancerAnims} from "../anims/enemyAnims.js";
=======
import { createGoblinAnims, createOgreAnims, createDemonAnims, createNecromancerAnims, createOozeSwampyAnims, createOozeMuddyAnims, createEnergyBallAnims, createZombieIceAnims, createSkeletonAnims, createZombieAnims, createOrcMaskedAnims, createDemonBigAnims, createDemonSmallAnims} from "../anims/enemyAnims.js";
>>>>>>> Stashed changes
import { createPlayerAnims } from "../anims/playerAnims.js";

//import enemies
import Goblin from "../enemies/goblin.js";
import Ogre from "../enemies/ogre.js";
import Demon from "../enemies/demon.js";
import Necromancer from "../enemies/necromancer.js";
<<<<<<< Updated upstream
=======
import OozeSwampy from "../enemies/oozeSwampy.js";
import OozeMuddy from "../enemies/oozeMuddy.js";
import ZombieIce from "../enemies/zombieIce.js";
import EnemyProjectile from "../enemies/attacks/enemyProjectile.js";
import Skeleton from "../enemies/skeleton.js";
import Zombie from "../enemies/zombie.js";
import OrcMasked from "../enemies/orc-masked.js";
import DemonBig from "../enemies/demonBig.js";
import DemonSmall from "../enemies/demonSmall.js";
>>>>>>> Stashed changes

//import Player
import Player from "../player/class/playerClass.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
        //player character
        this.knight = undefined;
        //arrow keys and space bar get stored in here
        this.cursors = undefined;
    }

    preload() {
        //set the arrow keys and space bar to the cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        //add animations
        createPlayerAnims(this.anims);
        createGoblinAnims(this.anims);
        createOgreAnims(this.anims);
        createDemonAnims(this.anims);
        createNecromancerAnims(this.anims);
<<<<<<< Updated upstream
=======
        createOozeSwampyAnims(this.anims);
        createOozeMuddyAnims(this.anims);
        createEnergyBallAnims(this.anims);
        createZombieIceAnims(this.anims);
        createSkeletonAnims(this.anims);
        createZombieAnims(this.anims);
        createOrcMaskedAnims(this.anims);
        createDemonBigAnims(this.anims);
        createDemonSmallAnims(this.anims);
>>>>>>> Stashed changes

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

        //FOR DEBUGGING
        //debugDraw.debugDraw(wallsLayer, this);
        
        //add the knight
        this.knight = this.add.player(this.scene, 200, 200, "knight");
        
        //set camera area
        this.cameras.main.setBounds(0, 0, 800, 560);
        //have it follow the knight
        this.cameras.main.startFollow(this.knight, true, 1, 1, 0, 0);
        //set camera zoom
<<<<<<< Updated upstream
        this.cameras.main.setZoom(1);

=======
        this.cameras.main.setZoom(2.5);

        //zombieIce shoots these 
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
        
>>>>>>> Stashed changes
        const goblins = this.physics.add.group({
            classType: Goblin,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(10, 10).setOffset(4, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });

        const ogres = this.physics.add.group({
            classType: Ogre,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(20, 25).setOffset(7, 7);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
<<<<<<< Updated upstream
=======
        this.enemiesTierFive.push({group: ogres, name: "ogre", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierSix.push({group: ogres, name: "ogre", spawnLayer: solidEnemySpawnPoints});
>>>>>>> Stashed changes

        const demons = this.physics.add.group({
            classType: Demon,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 20).setOffset(2, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
<<<<<<< Updated upstream
=======
        this.enemiesTierThree.push({group: demons, name: "demon", spawnLayer: solidEnemySpawnPoints});
        this.enemiesTierFour.push({group: demons, name: "demon", spawnLayer: solidEnemySpawnPoints});
>>>>>>> Stashed changes

        const necromancers = this.physics.add.group({
            classType: Necromancer,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 20).setOffset(2, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

        
        goblins.get(125, 125, "goblin");
        ogres.get(400, 350, "ogre");
        demons.get(300, 450, "demon");
        necromancers.get(250, 350, "necromancer");


        this.physics.add.collider(this.knight, wallsLayer);
        this.physics.add.collider(goblins, wallsLayer);
        this.physics.add.collider(ogres, wallsLayer);
        this.physics.add.collider(demons, wallsLayer);
        this.physics.add.collider(necromancers, wallsLayer);
<<<<<<< Updated upstream
        this.physics.add.collider(goblins, this.knight, this.handleEnemyCollisions, undefined, this);
        this.physics.add.collider(ogres, this.knight, this.handleEnemyCollisions, undefined, this);
        this.physics.add.collider(demons, this.knight, this.handleEnemyCollisions, undefined, this);
        this.physics.add.collider(necromancers, this.knight, this.handleEnemyCollisions, undefined, this);
=======
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
>>>>>>> Stashed changes
    }

    handleEnemyCollisions(player, enemy){
        let directionX = player.x - enemy.x;
        let directionY = player.y - enemy.y;

        let directionalVector = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(enemy.knockBack);

        this.knight.takeDamage(directionalVector, enemy.damage);
    }

    update(){
        if(this.knight){
            this.knight.update(this.cursors);
        }
    }
}