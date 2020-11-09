//put global functions in here for testing

var object;

const testCreate = (scene) => {
    // object = scene.physics.add.sprite(200, 200, "spear");
    
    // scene.tweens.add({
    //     targets: object,
    //     x: 300,
    //     ease: "Linear",
    //     duration: 1000
    // });

    const yOffset = 4;
    const xOffset = -1;

    let shoutOverlapCircles = scene.physics.add.group({
        createCallback: (gameObject) => {
            gameObject.alpha = 0;
            gameObject.body.setCircle(64);
            gameObject.body.onCollide = true;
        }
    });

     //let circle = scene.physics.add(200 + xOffset, 200 + yOffset, "black-circle")

    let circle = shoutOverlapCircles.get(200 + xOffset, 200 + yOffset, "black-circle")
    
    var particles = scene.add.particles('color-particles');
    
    var emitter = particles.createEmitter({
        frame: ["colored-particles0.png", "colored-particles1.png"],
        x: scene.knight.x + xOffset,
        y: scene.knight.y + yOffset,
        speed: 300,
        lifespan: 200,
        scale: { start: 0.01, end: 0.08 },
        quantity: 6,
        blendMode: 'ADD'
    });
    
    scene.time.delayedCall(300,() => {
        emitter.explode(100);
    })

    var axesArray = [];
    
    const logCollision = (col, axe) => {
        if(axesArray.indexOf(axe) < 0){
            console.log(`The Circle is ${col}`);
            console.log(`The Knight is ${axe}`);
            axesArray.push(axe);
        }
        
    }
    
    scene.physics.add.overlap(shoutOverlapCircles, scene.knight.axes, logCollision, undefined, this)
}

const testUpdate = (scene) => {

}

export {
    testCreate,
    testUpdate
} 