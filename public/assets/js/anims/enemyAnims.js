const createGoblinAnims = anims => {
    anims.create({
        key: "goblin-idle",
        frames: anims.generateFrameNames("goblin", {start: 0, end: 3, prefix: "goblin_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "goblin-run",
        frames: anims.generateFrameNames("goblin", {start: 0, end: 3, prefix: "goblin_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}

export {
    createGoblinAnims
}