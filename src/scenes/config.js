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

        //This will add a line with an option an will be stored in a local way
        //We will initializing everithing as is in flase in case this is true later we
        //will add the tick into the image
        this.add.dynamicBitmapText(this.sys.game.config.width/8, this.sys.game.config.height / 10 *4, 'pixel', 'HIT WALLS', 14).setOrigin(0, 0.5);
        this.buttonHitWalls = new Button(this, ()=>this.changeLocalInfo('hitWalls', this.buttonHitWalls), {
            kindOfButton: 'smallButton',
            x: this.sys.game.config.width/8 * 7,
            y: this.sys.game.config.height / 10 *4,
            xAnchor: 1,
            yAnchor: 0.5,
            normalColor: '1480d9',
            hoverColor: '1167ad',
        });
        this.setLocalInfo('hitWalls',this.buttonHitWalls)
    }
    
    //this will tick a space if the value is true
    setLocalInfo(key, button){
        if(localStorage.getItem(key) == 'true'){
            button.addImage('tick');
        }
    }

    //this Will handle all the information of a key and interact with it
    //the info that we set here will be used in the game to change some preferences
    changeLocalInfo(key, button){
        if(localStorage.getItem(key) == 'true'){
            localStorage.setItem(key, 'false');
            button.destroyImage();
        }
        else{
            localStorage.setItem(key, 'true');
            button.addImage('tick');
        }
    }

    create(){
    }
}

export default Config;

