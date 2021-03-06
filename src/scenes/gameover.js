//Import of every element will be used in the scene
import ButtonLoader from '../gameobjects/buttonloader.js';
import Language from '../language.js';

//This class will manage the game over and send you back to the main menu
class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver');
    }

    preload(){
        //Get the text in the correct language
        this.texts = Language.getText(this.scene.key);

        //This how we load the button
        this.button = new ButtonLoader(this,'Menu',{
            textOfButton: this.texts.playAgain
        })
    }

    create(){
        //Stops the over position of the scene ui wich held the score inside the game
        this.scene.stop('UI');

        //This is how we add a game text with bitmap font
        //This bit map only contains Uppercase characters thats why all the texts should be written in Uppercase
        //First we set the x position, then the y position
        //after that we select the font previosly load, the text to write and the size of the font
        //We set origin at 0.5 to set origin in the half of the text otherwise the origin will be at the top left
        this.add.dynamicBitmapText(this.sys.game.config.width/2, this.sys.game.config.height/3, 'pixel', this.texts.gameOver, 30).setOrigin(0.5);
    }
}

export default GameOver;