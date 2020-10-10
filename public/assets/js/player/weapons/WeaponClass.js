export default class Weapon extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.damage = 5;
        this.knockback = 100;
    }
}