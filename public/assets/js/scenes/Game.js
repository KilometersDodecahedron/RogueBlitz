//you're getting Phaser from the cdn

//used to test collision boundaries
import debugDraw from "../utils/debug.js";

//import animations stored in separate files
import { createGoblinAnims, createOgreAnims, createDemonAnims, createNecromancerAnims, createOozeSwampyAnims, createOozeMuddyAnims} from "../anims/enemyAnims.js";
import { createPlayerAnims } from "../anims/playerAnims.js";

//import enemies
import Goblin from "../enemies/goblin.js";
import Ogre from "../enemies/ogre.js";
import Demon from "../enemies/demon.js";
import Necromancer from "../enemies/necromancer.js";
import OozeSwampy from "../enemies/oozeSwampy.js";
import OozeMuddy from "../enemies/oozeMuddy.js";

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
    }

    preload() {
        //set the arrow keys and space bar to the cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        //add health bar
        this.scene.run('game-ui');

        //add animations
        createPlayerAnims(this.anims);
        createGoblinAnims(this.anims);
        createOgreAnims(this.anims);
        createDemonAnims(this.anims);
        createNecromancerAnims(this.anims);
        createOozeSwampyAnims(this.anims);
        createOozeMuddyAnims(this.anims);

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
        console.log(phasingEnemySpawnPoints.objects[0]);

        console.log(this.randomArrayShuffle(phasingEnemySpawnPoints.objects)[0]);

        //FOR DEBUGGING
        //debugDraw.debugDraw(wallsLayer, this);
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
    
        //set camera area
        this.cameras.main.setBounds(0, 0, 800, 560);
        //have it follow the knight
        this.cameras.main.startFollow(this.knight, true, 1, 1, 0, 0);
        //set camera zoom
        this.cameras.main.setZoom(2.5);

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

        const demons = this.physics.add.group({
            classType: Demon,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 20).setOffset(2, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });

        const necromancers = this.physics.add.group({
            classType: Necromancer,
            createCallback: (gameObject) => {
                //set their hit boxes correctly
                gameObject.body.setSize(13, 20).setOffset(2, 5);
                //have them create an event when they come in collide with something 
                gameObject.body.onCollide = true;
            }
        });

        const oozeSwampy = this.physics.add.group({
            classType: OozeSwampy,
            createCallback: (gameObject) => {
                gameObject.body.collideWorldBounds=true;
                gameObject.body.onCollide = true;
                gameObject.setPlayer(this.knight);
            }
        })

        const oozeMuddy = this.physics.add.group({
            classType: OozeMuddy,
            createCallback: (gameObject) => {
                gameObject.body.collideWorldBounds=true;
                gameObject.body.onCollide = true;
                gameObject.setPlayer(this.knight);
                gameObject.callbackColorChange();
            }
        })

        // goblins.get(125, 125, "goblin");
        // ogres.get(400, 350, "ogre");
        // demons.get(300, 450, "demon");
        // necromancers.get(250, 350, "necromancer");
        // oozeSwampy.get(100, 100, "ooze-swampy");
        // oozeMuddy.get(500, 100, "ooze-muddy");

        for(let i = 0; i < 6; i++){
            this.spawnInRandomPosition(goblins, "goblin", solidEnemySpawnPoints);
        }
        
        this.physics.add.collider(this.knight, wallsLayer);
        this.physics.add.collider(goblins, wallsLayer);
        this.physics.add.collider(ogres, wallsLayer);
        this.physics.add.collider(demons, wallsLayer);
        this.physics.add.collider(necromancers, wallsLayer);
        //knives hit walls
        this.physics.add.collider(knives, wallsLayer, this.handleProjectileWallCollision, undefined, this);

        //weapon collisions
        this.physics.add.collider(knives, goblins, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, ogres, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, demons, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, necromancers, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, oozeSwampy, this.handleProjectileHit, undefined, this);
        this.physics.add.collider(knives, oozeMuddy, this.handleProjectileHit, undefined, this);

        //stores all the enemy collisions in an array, to be deleted when the player dies
        this.playerEnemyCollisionArray.push(this.physics.add.collider(goblins, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(ogres, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(demons, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(necromancers, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(oozeSwampy, this.knight, this.handleEnemyCollisions, undefined, this));
        this.playerEnemyCollisionArray.push(this.physics.add.collider(oozeMuddy, this.knight, this.handleEnemyCollisions, undefined, this));
    }

    handleProjectileHit(projectile, enemy){
        let directionX = this.knight.x - enemy.x;
        let directionY = this.knight.y - enemy.y;

        let directionalVector = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(-projectile.knockback);

        console.log(directionalVector);

        enemy.takeDamage(projectile.damage, directionalVector);
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
        }
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
                console.log(distance);
                break;
            }
        }
    }

    //spawns an enemy
    spawnEnemy(enemyType, enemyName, enemySpawnPositionObject){
        //enemySpawnPositionObject is offset by half the height and width to accomidate for Tiled positioning issues
        let newEnemy = enemyType.get(enemySpawnPositionObject.x + (enemySpawnPositionObject.width * 0.5), 
            enemySpawnPositionObject.y - (enemySpawnPositionObject.height * 0.5), enemyName);
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

    update(){
        if(this.knight){
            this.knight.update(this.cursors);
        }
    }
}