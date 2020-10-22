export default class TemporaryVisualEffectClass extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.name, config.scale, config.alpha);

        config.scene.add.existing(this);

        this.alpha = config.alpha;
        this.setScale(config.scale, config.scale);
        this.play(config.name);
        this.on("animationcomplete", () => {
            this.destroy();
        })
    }
}