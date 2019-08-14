//Elements requiered for this object
import Button from '../gameobjects/button.js';
import ButtonLoader from '../gameobjects/buttonloader.js';
import Keys from '../keys.js';
import Language from '../language.js';


//This scene will hold all the possible configurations of the game to change it
class Config extends Phaser.Scene{
    constructor(){
        super('Config');
    }

    preload(){
        //Get the current language
        this.texts = Language.getText(this.scene.key);

        //This is a simple return button
        this.buttonReturn = new ButtonLoader(this, 'Menu', {
            kindOfButton: 'smallButton',
            secondImage: 'return',
            x: 5,
            y: 5,
            xAnchor: 0,
            yAnchor: 0,
        });

        this.title = this.add.dynamicBitmapText(this.sys.game.config.width/2, this.sys.game.config.height/5,'pixel', this.texts.title, 16).setOrigin(0.5);

        //This will add a line with an option an will be stored in a local way
        //We will initializing everithing as is in false in case this is true later we
        //will add the tick into the image
        this.hitWalls = this.add.dynamicBitmapText(this.sys.game.config.width/8, this.sys.game.config.height / 20 *8, 'pixel', this.texts.hitWalls, 14).setOrigin(0, 0.5);
        this.buttonHitWalls = new Button(this, ()=>this.changeLocalInfo('hitWalls', this.buttonHitWalls), {
            kindOfButton: 'smallButton',
            x: this.sys.game.config.width/8 * 7,
            y: this.sys.game.config.height / 10 *4,
            xAnchor: 1,
            yAnchor: 0.5,
            normalColor: '1480d9',
            hoverColor: '1167ad',
        });
        this.setLocalInfo(Keys.value.hitWalls,this.buttonHitWalls);


        //This will change the language of the game just pressing the button
        this.language = this.add.dynamicBitmapText(this.sys.game.config.width/8, this.sys.game.config.height/20 *11,'pixel', this.texts.language, 14).setOrigin(0, 0.5);
        this.changeLanguageButton = new Button(this, ()=>this.changeIndex('language',this.changeLanguageButton), {
            textOfButton: this.texts.languageButton,
            x: this.sys.game.config.width/8 * 7,
            y: this.sys.game.config.height / 20 * 11,
            normalColor: '1480d9',
            hoverColor: '1167ad',
        });
    }
    
    //this will tick a space if the value is true
    setLocalInfo(key, button){
        if(key){
            button.addImage('tick');
        }
    }

    //this Will handle all the information of a key and interact with it
    //the info that we set here will be used in the game to change some preferences
    changeLocalInfo(key, button){
        //first we will check if the value we are accesing is true
        //in case it is we will destroy the tick image and change the value in the map to false
        if(Keys.value[key]){
            Keys.value[key] = false;
            button.destroyImage();
        }
        //otherwise we will add the tick and change the map value to true
        else{
            Keys.value[key] = true;
            button.addImage('tick');
        }

        //After any result we will save the information in a json
        //since local storage only saves strings we have to transform our object to a string
        localStorage.setItem(Keys.direction, JSON.stringify(Keys.value));
    }

    //this will help us when we need to change a value in index form
    //right now is for language only we will change it eventually
    changeIndex(key,button){
        if(Keys.value[key] < Language.languageNumber -1){
            Keys.value[key]++;
        }
        else{
            Keys.value[key] = 0;
        }
        this.changeTexts();
        button.changeText(this.texts.languageButton);
        localStorage.setItem(Keys.direction, JSON.stringify(Keys.value));
    }

    //this update the texts in the scene to be in the correct language
    changeTexts(){
        this.texts = Language.getText(this.scene.key);
        this.title.text = this.texts.title;
        this.hitWalls.text = this.texts.hitWalls;
        this.language.text = this.texts.language;
    }
}

export default Config;

