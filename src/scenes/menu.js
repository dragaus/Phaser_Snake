//Import elements requiered for this scene
import ButtonLoader from '../gameobjects/buttonloader.js';
import Keys from '../keys.js';
import Language from '../language.js';

//This class will be or main menu
class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
    }

    preload(){
        //Because we will have save some information to save in diferent places
        //the easiest way to do that is to save it in a map 
        //create a json and the recover that map
        //here we will get the data if we already saved a map
        if(localStorage.getItem(Keys.direction) != null){
            Keys.value = JSON.parse(localStorage.getItem(Keys.direction));
        }
        //here will save a map for the first time if it doesn't exist
        else{
            localStorage.setItem(Keys.direction, JSON.stringify(Keys.value));
        }

        //Get the text in the correct language
        this.texts = Language.getText(this.scene.key);

        //Set the game title
        this.add.dynamicBitmapText(this.sys.game.config.width /2, this.sys.game.config.height /3, 'pixel', 'SNAKE', 30).setOrigin(0.5);

        //this buttons will send to other scenes
        this.playButton = new ButtonLoader(this, 'Game', {
            textOfButton: this.texts.play,
            y: this.sys.game.config.height /10 * 7
        });

        this.playButton = new ButtonLoader(this, 'Credits', {
            textOfButton: this.texts.credits,
            y: this.sys.game.config.height /10 * 8.5,
            normalColor: 'ff004c',
            hoverColor: 'c9003c'
        });

        this.configButton = new ButtonLoader(this, 'Config',{
            kindOfButton: 'smallButton',
            normalColor: '1480d9',
            hoverColor: '1167ad',
            secondImage: 'config',
            x: 5,
            y: 5,
            xAnchor: 0,
            yAnchor: 0
        });
    }
}

export default Menu