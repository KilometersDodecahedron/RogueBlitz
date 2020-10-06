const createPlayerAnims = (anims) => {
    anims.create({
        key: "knight-hit",
        frames: [{key: "knight", frame: "knight-f-hit-anim-f-0.png"}]
    })

    anims.create({
        key: "knight-idle",
        frames: [{key: "knight", frame: "knight-f-idle-anim-f-0.png"},
            {key: "knight", frame: "knight-f-idle-anim-f-1.png"},
            {key: "knight", frame: "knight-f-idle-anim-f-2.png"},
            {key: "knight", frame: "knight-f-idle-anim-f-3.png"}],
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: "knight-run",
        frames: [{key: 'knight', frame: "knight-f-run-anim-f-0.png"},
            {key: 'knight', frame: "knight-f-run-anim-f-1.png"},
            {key: 'knight', frame: "knight-f-run-anim-f-2.png"},
            {key: 'knight', frame: "knight-f-run-anim-f-3.png"}],
        frameRate: 12,
        repeat: -1
    });
}

export {
    createPlayerAnims
}