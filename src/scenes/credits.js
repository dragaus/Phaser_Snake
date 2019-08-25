//Elements requiered for this object
import Button from '../gameobjects/button.js';
import ButtonLoader from '../gameobjects/buttonloader.js';
import Language from '../language.js'

//This will be our scene credits
class Credits extends Phaser.Scene{
    constructor(){
        super('Credits');
    }

    preload(){
        //Get the text in the correct language
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

        //This buttons are think to send to see more information about you and your proyects
        this.buttonContact = new Button(this, ()=>this.goTo('https://www.linkedin.com/in/francisco-rovira/'), {
            textOfButton: this.texts.contact,
            normalColor: '1480d9',
            hoverColor: '1167ad',
            y: (this.sys.game.config.height/5*3),
        });
        this.buttonGit = new Button(this, ()=>this.goTo('https://github.com/dragaus/Phaser_Snake'), {
            textOfButton: this.texts.git,
            normalColor: '6e5494',
            hoverColor: '52406e',
            y: (this.sys.game.config.height/5*4)
        });
    }

    create(){
        //we create but scince its in diferent lines we neeed to center it to looks better
        this.text = this.add.dynamicBitmapText(this.sys.game.config.width/2, this.sys.game.config.height/4, 'pixel', `${this.texts.made}\n\nFRANCISCO C. C. ROVIRA\n\n${this.texts.with}`, 16).setOrigin(0.5);
        this.text._align = 1;
    }

    //this function will open a web in another tab
    goTo(url){
        window.open(url);
    }
}

export default Credits;