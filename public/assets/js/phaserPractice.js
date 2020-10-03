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
var bombs;
var stars;
var player;
//used to establish a keyboard connection in "create"
var cursors;

//holds the score
var score = 0;
//the Game Object that displays the score to the player
var scoreText;

//checks to see if you lost
var gameOver = false;

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
        //FloatBetween gets a random decimal between the two values
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
    });

    //create the group for Bombs, which will kill the player
    bombs = this.physics.add.group();

    //keeps the bombs from falling through the ground
    this.physics.add.collider(bombs, platforms);
    //run "hitBomb()" [defined below] when player collides with bomb
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    //create a text object to display the player's score
    //16, 16 gives the coordinates of the text
    //'Score: 0' is the dafault text
    //the object has the settings for the text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    //have the Player collide with the platforms
    this.physics.add.collider(player, platforms);
    //have the Stars collide with the platforms
    this.physics.add.collider(stars, platforms);

    //check if the player is overlapping with a Game Object in the "stars" group
    //if so, run collectStar() [defined below]
    //"null" is an optional callback function, that runs before collectStar(), and returns a bool
    //--the first callback will only run if this callback returns true
    //"this" is the context in which to run the callback. Optional
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
        //applying negative Y velocity shoots them upward 
        player.setVelocityY(-330);
    }
    //END OF PLAYER MOVEMENT
}

//runs when the player overlaps with a star
//takes in the two Game Objects that collided
function collectStar (player, star)
{
    //removes physics from the object
    //first parameter (optional) calls "disableGameObject"
    //second parameter (optional) calls "hideGameObject"
    //--basically, this stops the object from doing anything, even being visible
    star.disableBody(true, true);

    //increments an int. Nothing special here, move along
    score += 10;
    //updates the text of the scoreText Game Object with the new score
    scoreText.setText('Score: ' + score);

    //check the number of Game Object in the "stars" group that are not disabled
    if (stars.countActive(true) === 0)
    {
        //A new batch of stars to collect
        //takes all the disabled stars, and turns them back on
        stars.children.iterate(function (child) {
            //first parameter, tell it to reset the body and place it at the next 2 coordinates
            //child.x gets the current x position of the Game Object
            //0 sets it to the top of the screen
            //final 2 parameters Activate and Show the Game Object
            child.enableBody(true, child.x, 0, true, true);
        });

        //checks the position of the player, to make sure the bomb doesn't spawn on top of them
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        //create a bomb Game Object at the the coordiates of the first 2 parameters
        //the third parameter ('bomb') tells it what sprite to use
        var bomb = bombs.create(x, 16, 'bomb');
        //100% ricochet, so it just keeps bouncing
        bomb.setBounce(1);
        //make sure it doesn't bounce out of the level
        bomb.setCollideWorldBounds(true);
        //grants initial velocity, moving down
        //moves it left or right in a random direction as well
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        //disables gravity to make sure it never looses momentum
        bomb.allowGravity = false;

    }
}

//runs when the player comes in contact with a bomb
function hitBomb (player, bomb)
{
    //stops all physics
    this.physics.pause();

    //turn the player red
    player.setTint(0xff0000);

    //trap the player in the "turn" animation
    //it has a velcity of 0, the player is trapped
    player.anims.play('turn');

    //set the bool true, but I don't thik it actually gets called
    gameOver = true;
}