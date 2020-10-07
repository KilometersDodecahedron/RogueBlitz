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
            classType: Phaser.GameObjects.Image,
            createCallback: (gameObject) => {
                //TODO find way to make hearts bigger
            }
        });

        //puts the hearts at the top of the screen
        this.hearts.createMultiple({
            key: "ui-heart-full",
            setXY: {
                x: 10,
                y: 10,
                stepX: 16
            },
            quantity: this.numberOfHearts
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
            console.log([index, healthIndex]);
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