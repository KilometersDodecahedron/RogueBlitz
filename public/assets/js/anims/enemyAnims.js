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

const createOgreAnims = anims => {
    anims.create({
        key: "ogre-idle",
        frames: anims.generateFrameNames("ogre", {start: 0, end: 3, prefix: "ogre_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "ogre-run",
        frames: anims.generateFrameNames("ogre", {start: 0, end: 3, prefix: "ogre_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}

const createDemonAnims = anims => {
    anims.create({
        key: "demon-idle",
        frames: anims.generateFrameNames("demon", {start: 0, end: 3, prefix: "chort_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "demon-run",
        frames: anims.generateFrameNames("demon", {start: 0, end: 3, prefix: "chort_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}

const createDemonSmallAnims = anims => {
    anims.create({
        key: "demon-small-idle",
        frames: anims.generateFrameNames("demon-small", {start: 0, end: 3, prefix: "imp_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "demon-small-run",
        frames: anims.generateFrameNames("demon-small", {start: 0, end: 3, prefix: "imp_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}

const createNecromancerAnims = anims => {
    anims.create({
        key: "necromancer-idle",
        frames: anims.generateFrameNames("necromancer", {start: 0, end: 3, prefix: "necromancer_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "necromancer-run",
        frames: anims.generateFrameNames("necromancer", {start: 0, end: 3, prefix: "necromancer_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}



export {
    createGoblinAnims,
    createOgreAnims,
    createDemonAnims,
    createNecromancerAnims,
    createDemonSmallAnims
}