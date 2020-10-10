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



const createSkeletonAnims = anims => {
    anims.create({
        key: "skelet-idle",
        frames: anims.generateFrameNames("skeleton", {start: 0, end: 3, prefix: "skelet_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "skelet-run",
        frames: anims.generateFrameNames("skeleton", {start: 0, end: 3, prefix: "skelet_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}

const createZombieAnims = anims => {
    anims.create({
        key: "zombie-idle",
        frames: anims.generateFrameNames("zombie", {start: 0, end: 3, prefix: "zombie_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "zombie-run",
        frames: anims.generateFrameNames("zombie", {start: 0, end: 3, prefix: "zombie_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}

const createOrcMaskedAnims = anims => {
    anims.create({
        key: "orc-masked-idle",
        frames: anims.generateFrameNames("orc-masked", {start: 0, end: 3, prefix: "masked_orc_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "orc-masked-run",
        frames: anims.generateFrameNames("orc-masked", {start: 0, end: 3, prefix: "masked_orc_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}

const createDemonBigAnims = anims => {
    anims.create({
        key: "demon-big-idle",
        frames: anims.generateFrameNames("demon-big", {start: 0, end: 3, prefix: "big_demon_idle_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "demon-big-run",
        frames: anims.generateFrameNames("demon-big", {start: 0, end: 3, prefix: "big_demon_run_anim_f", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });
}

export {
    createGoblinAnims,
    createOgreAnims,
    createDemonAnims,
<<<<<<< Updated upstream
    createNecromancerAnims
=======
    createNecromancerAnims,
    createDemonSmallAnims,
    createOozeSwampyAnims,
    createOozeMuddyAnims,
    createEnergyBallAnims,
    createZombieIceAnims,
    createSkeletonAnims,
    createZombieAnims,
    createOrcMaskedAnims,
    createDemonBigAnims
>>>>>>> Stashed changes
}