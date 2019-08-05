//Import elements requiered for this scene
import ButtonLoader from '../gameobjects/buttonloader.js';

//This class will be or main menu
class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
    }

    preload(){
        this.add.dynamicBitmapText(this.sys.game.config.width /2, this.sys.game.config.height /3, 'pixel', 'SNAKE', 30).setOrigin(0.5);

        //this buttons will send to other scenes
        this.playButton = new ButtonLoader(this, 'Game', {
            textOfButton: 'PLAY',
            y: this.sys.game.config.height /10 * 7
        });

        this.playButton = new ButtonLoader(this, 'Credits', {
            textOfButton: 'CREDITS',
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