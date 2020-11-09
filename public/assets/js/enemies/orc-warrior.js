import WeaponWieldingEnemy from "./weaponWieldingEnemyClass.js";

export default class OrcWarrior extends WeaponWieldingEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 10;
        this.damage = 2;
        this.speed = 0;
        this.knockBack = 200;

        this.changeDirectionInterval = 2000;
        this.movesFromTheStart = true;
        this.canBeStill = false;
        this.canMoveDiagonally = false;

        this.pointValue = 30;

        this.descendantStartMethod();
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("orc-warrior-idle", "orc-warrior-run");  
    }
}