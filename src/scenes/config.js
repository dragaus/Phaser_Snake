//Elements requiered for this object
import Button from '../gameobjects/button.js';
import ButtonLoader from '../gameobjects/buttonloader.js';


//This scene will hold all the possible configurations of the game to change it
class Config extends Phaser.Scene{
    constructor(){
        super('Config');
    }

    preload(){
        //This is a simple return button
        this.buttonReturn = new ButtonLoader(this, 'Menu', {
            kindOfButton: 'smallButton',
            secondImage: 'return',
            x: 5,
            y: 5,
            xAnchor: 0,
            yAnchor: 0,
        });

        this.add.dynamicBitmapText(this.sys.game.config.width/2, this.sys.game.config.height/5,'pixel', 'CONFIGURATION', 16).setOrigin(0.5);
    }
    
    create(){
    }
}

export default Config;