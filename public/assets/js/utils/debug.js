//check layers
const debugDraw = (layer, scene) => {
    let debugGraphics = scene.add.graphics().setAlpha(0.7);
    layer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
}

export default {
    debugDraw: debugDraw
};