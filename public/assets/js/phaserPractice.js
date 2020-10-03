//Code from the official Phaser 3 Tutorial
//annotations by me

//how you create your game
//different object propertis set different game settings
var config = {
    //the render context you want to use for your game. this is the recommended value
    type: Phaser.AUTO,
    //set the width and height of the canvas element, where the game is displayed
    //this canvas element will be appended to the document at the point the script was called
    width: 800,
    height: 600,
    //tells it to use physics
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//this will be used as a Physics Group in "create"
var platforms;
var stars;
var player;
//used to establish a keyboard connection in "create"
var cursors;

//creates an instance of the Game class
//the "config" object is passed in as a constructor
var game = new Phaser.Game(config);

//get the assets the game needs before starting it
function preload ()
{
    //first parameter is the var name, the link to the asset in the rest of the code
    //the second parameter is the filepath to the asset
    this.load.image('sky', '../assets/img/practice/sky.png');
    this.load.image('ground', '../assets/img/practice/platform.png');
    this.load.image('star', '../assets/img/practice/star.png');
    this.load.image('bomb', '../assets/img/practice/bomb.png');
    //divides up the sprite sheet into the given width and height
    //NOTE: phaser supports flipping sprites
    this.load.spritesheet('dude', '../assets/img/practice/dude.png', { frameWidth: 32, frameHeight: 48 });
}

//this runs after preload, right before the game starts
//use this to load in the pieces of the scene
function create ()
{
    //400 and 300 are the x & y coordiates of the image
    //in phaser, all Game Object Positions are based on their center by default
    //this can be changed using "setOrigin"
    //EXAMPLE: this.add.image(0, 0, 'sky').setOrigin(0, 0) 
    //--would reset the drawing position of the image to the top-left
    //REMEMBER: (0, 0) is the TOP LEFT, (800, 600) is the BOTTOM RIGHT
    this.add.image(400, 300, 'sky');
    //the order game objects overlap is based on the order they're loaded
    //load backgrounds first, followed by what goes on top of it
    //"this.add.image" creates a new image Game Object and adds it to the current Scenes display list
    //the scene extends infinitely in all directions, but you can't see it unless it's within the camera
    this.add.image(400, 300, 'star');

    //this.physics means using the "arcade" physics system
    //creates a new Static Physics Group, and assigns it to the local variable "platforms"
    //arcade physics has 2 type of Physics Bodies: Dynamic & Static
    //"static" means it won't move, or be effected by physics at all
    //a Physics Group lets all the children function as 1 unit
    //can also check for collision between Groups and other game objects
    //objects are Dynamic unless told otherwise
    platforms = this.physics.add.staticGroup();

    //setScale multiplies the size of the object by the scale
    //refreshBody is used to implement the changes, because the object is Static, so it's not otherwise looking for updates
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //Physics Groups can create their own Physics Enabled Children using "create" 
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    //creates the Player sprite
    //gives it a "Dynamic" physics engine
    //Physics Sprite have a "body" property, which can be accessed to alter its physics
    //Example: player.body.setGravityY(300)
    player = this.physics.add.sprite(100, 450, 'dude');

    //set ricochet. As in, if it hits something, 0-1 is percent richochet
    player.setBounce(0.2);
    //have it treat the edges of the canvas as impassible
    player.setCollideWorldBounds(true);

    //create animations
    //animations are stored globally, and can be accessed by any game object
    this.anims.create({
        //name of animation
        key: 'left',
        //tells it what sprites to use in the animation
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        //how fast to swap between them each second
        frameRate: 10,
        //tells the animation to loop
        //don't know why that's represented with -1, just go with it
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //create connections to the arrow keys
    //checked for in the Update loop
    //includes four (4) properties: up, down, left, right
    //each represents an arrow key
    cursors = this.input.keyboard.createCursorKeys();

    //check for collisions between the specified objects
    //also works for Group Objects
    //can also invoke callbacks based on the collision
    this.physics.add.collider(player, platforms);

    //add the stars for the player to collect
    stars = this.physics.add.group({
        //set default image
        //meaning, Objects in the "stars" group will use the star.png image unless otherwise specified
        key: 'star',
        //tells it to make more than 1
        //the amount it creates = the number here + 1
        //meaning, this makes 12 stars
        repeat: 11,
        //set the position of the 12 children the Group creates
        //x & y set the starting position of the first object
        //stepX & stepY tells it how much to change it each iteration
        setXY: { x: 12, y: 0, stepX: 70, stepY: -10 }
    });

    //the children group property lets you access members of the group
    //iterate method tells it t go trough each of them, and run the function you put in
    //the "child" parameter gets the current child it's going through
    stars.children.iterate(function (child) {
        //bounces ranges from 0 to 1
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
}

function update () {
    //START OF PLAYER MOVEMENT
    //check if left arrow held down
    if (cursors.left.isDown)
    {
        //give velocity
        //negative x velocity moves you left
        player.setVelocityX(-160);

        //play the animation
        player.anims.play('left', true);
    }
    //check if right arrow held down
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }


    //checks to see if player is touching anything beneath them before jumping
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    //END OF PLAYER MOVEMENT
}

function collectStar (player, star)
{
    star.disableBody(true, true);
}