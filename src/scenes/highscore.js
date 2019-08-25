//Import the needed data
import Keys from '../keys.js';
import ButtonLoader from '../gameobjects/buttonloader.js';
import Language from '../language.js';

//This scene will hold the best scores
class HighScore extends Phaser.Scene{
    constructor(){
        super("HighScore");
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

        //Set the title
        this.add.dynamicBitmapText(this.sys.game.config.width /2, this.sys.game.config.height/ 6, 'pixel', this.texts.highScore, 18).setOrigin(0.5);
        
        //We create a collection of positions to generate a beutifull grid
        var heightPos = this.sys.game.config.height/ 18 * 5;
        var numberPos = this.sys.game.config.width/ 6;
        var namePos  = this.sys.game.config.width/ 6 *3;
        var scorePos = this.sys.game.config.width/ 6 * 5;
        
        //We create a loop to print all the highscores
        for(let i = 0; i < Keys.maxHighscores;i++){
            //this will set the  position in the table
            this.add.dynamicBitmapText(numberPos, heightPos, 'pixel', i+1, 16).setOrigin(0.5);

            //this will set the name in case the player has a value
            var name = Keys.value.highScores.length > i ? Keys.value.highScores[i].name : 'XXX';
            this.add.dynamicBitmapText(namePos, heightPos, 'pixel', name, 16).setOrigin(0.5);

            //this will set the score in case the player has a value
            var score = Keys.value.highScores.length > i ? Keys.value.highScores[i].score : 0;
            this.add.dynamicBitmapText(scorePos, heightPos, 'pixel',  Phaser.Utils.String.Pad(score,6,0,1), 16).setOrigin(0.5);

            //we add space between lines
            heightPos += this.sys.game.config.height/ 12;
        }
    }
}

export default HighScore;