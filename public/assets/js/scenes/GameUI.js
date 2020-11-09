import { sceneEvents } from "../events/eventCenter.js";
import { eventNames } from "../events/eventNames.js";

export default class GameUI extends Phaser.Scene {
    //TODO pass # into constructor to set numberOfHearts
    constructor(){
        //the key to get it
        super("game-ui");

        this.daggerDisplay;
        this.daggerPositionOffset = 70;
        this.daggerButtonText;

        this.numberOfHearts = 4
        this.hearts;
        this.scoreDisplay;

        this.weaponDisplay;
        this.numberOfWeaponChunks = 4;
        this.weaponBar;
        this.weaponButtonText;

        this.ultimateDisplay;
        this.numberOfUltimateChunks = 10;
        this.ultimateChargeBar;
        this.ultimateButtonText;
    }

    create(){
        this.daggerDisplay =this.add.image(180, 20, "knife").setScale(3.5, 3.5);
        this.daggerButtonText = this.add.text(155, 35, "SPACE");

        this.scoreDisplay = this.add.text(5, 40, "Score: 0");

        //group object for the heath hearts
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        });

        //group object for the mana bar
        this.weaponBar = this.add.group({
            classType: Phaser.GameObjects.Image
        });

        //group object for the ultimate bar
        this.ultimateChargeBar = this.add.group({
            classType: Phaser.GameObjects.Image
        });

        //puts the hearts at the top of the screen
        this.hearts.createMultiple({
            key: "ui-heart-full",
            setXY: {
                x: 20,
                y: 20,
                stepX: 32
            },
            quantity: this.numberOfHearts
        });

        //create the mana bar chunks
        this.weaponBar.createMultiple({
            key: "mana-bar-chunk",
            setXY: {
                x: 196 + this.daggerPositionOffset,
                y: 43,
                stepX: -12
            },
            quantity: this.numberOfWeaponChunks
        });
        
        //called before the bar so the bar goes over it
        this.ultimateDisplay = this.add.image(250 + this.daggerPositionOffset, 20, "shouting-mouth").setScale(0.75, 0.75)
        this.ultimateButtonText = this.add.text(244 + this.daggerPositionOffset, 11, "E").setScale(1.25, 1.25);

        this.ultimateChargeBar.createMultiple({
            key: "mana-bar-chunk-empty",
            setXY: {
                x: 223 + this.daggerPositionOffset,
                y: 43,
                stepX: 6
            },
            quantity: this.numberOfUltimateChunks
        });

        this.weaponDisplay = this.add.image(180 + this.daggerPositionOffset, 20, "axe").setScale(2.5, 2.5);
        this.weaponButtonText = this.add.text(170 + this.daggerPositionOffset, 11, "R").setScale(1.25, 1.25);

        //make the hearts bigger
        this.hearts.children.iterate(child => {
            child.setScale(2, 2);
        });

        //make mana chunks smaller
        this.weaponBar.children.iterate(child => {
            child.setScale(1, 1);
        });

        this.ultimateChargeBar.children.iterate(child => {
            child.setScale(0.5, 1);
        });

        //checks for the playerHealthChanged event, and updates the ui
        sceneEvents.on(eventNames.playerHealthChanged, this.handlePlayerHealthChanged, this);
        sceneEvents.on(eventNames.scoreUpdated, this.handlePlayerScoreChanged, this);
        sceneEvents.on(eventNames.weaponChargeChanged, this.handleWeaponSwingChangeChange, this);
        sceneEvents.on(eventNames.ultimateChargeChanged, this.handleUltimateChargeChanged, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(eventNames.playerHealthChanged, this.handlePlayerHealthChanged, this);
            sceneEvents.off(eventNames.scoreUpdated, this.handlePlayerScoreChanged, this);
            sceneEvents.off(eventNames.weaponChargeChanged, this.handleWeaponSwingChangeChange, this);
        })
    }

    handleWeaponSwingChangeChange(charges){
        this.weaponBar.children.each((gameObject, index) => {
            if(index < charges){
                gameObject.setTexture("mana-bar-chunk-empty");
            }else{
                gameObject.setTexture("mana-bar-chunk");
            }
        });
    }

    handlePlayerHealthChanged(health){
        //each heart takes 2 hits, and index starts at 0
        let healthIndex = (health / 2) - 1;
        this.hearts.children.each((gameObject, index) => {
            if(index <= healthIndex){
                gameObject.setTexture("ui-heart-full")
            //checks for the half-heart
            }else if(index < healthIndex + 1){
                gameObject.setTexture("ui-heart-half")
            }else{
                gameObject.setTexture("ui-heart-empty")
            }
        });
    }

    //takes a number from 0 to 1
    handleUltimateChargeChanged(ratio){
        //fully charged
        if(ratio >= 1){
            this.ultimateChargeBar.children.each((gameObject) => {
                gameObject.setTint(0x00ff00);
            });
        }else{
            this.ultimateChargeBar.children.each((gameObject, index) => {
                const check = (index + 1) / 10;
                if(ratio >= check){
                    gameObject.setTint(0xff0000);
                }else{
                    gameObject.setTint(0xffffff);
                }
            });
        }
    }

    handlePlayerScoreChanged(score){
        this.scoreDisplay.text = "Score: " + score;
    }
}