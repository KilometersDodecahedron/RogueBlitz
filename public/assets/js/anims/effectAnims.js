const createExplosionSampleAnims = anims => {
    anims.create({
        key: "explosion-sample",
        frames: anims.generateFrameNames("explosion-sample", {start: 0, end: 9, prefix: "explosion-sample", suffix: ".png"}),
        frameRate: 30
    })
}

export {
    createExplosionSampleAnims
}