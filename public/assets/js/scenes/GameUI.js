import { sceneEvents } from "../events/eventCenter.js";
import { eventNames } from "../events/eventNames.js";

export default class GameUI extends Phaser.Scene {
    //TODO pass # into constructor to set numberOfHearts
    constructor(){
        //the key to get it
        super("game-ui");

        this.numberOfHearts = 3
        this.hearts
    }

    create(){
        this.hearts = this.add.group({
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

        //make the hearts bigger
        this.hearts.children.iterate(child => {
            child.setScale(2, 2);
        });

        //checks for the playerHealthChanged event, and updates the ui
        sceneEvents.on(eventNames.playerHealthChanged, this.handlePlayerHealthChanged, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(eventNames.playerHealthChanged, this.handlePlayerHealthChanged, this);
        })
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
}