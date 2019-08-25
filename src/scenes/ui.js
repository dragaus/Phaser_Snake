//Import needed packages
import Language from '../language.js';
import Keys from '../keys.js';

//This scene will hold all the data related to the score of a game in progress
class UI extends Phaser.Scene{
    constructor(){
        super('UI');
    }

    preload(){
        Keys.currentScore = 0;
        this.highscore = null;
    }

    create(){
        //Get the text in the correct language
        this.texts = Language.getText(this.scene.key);

        //Create the scoreboard and center it
        this.add.image(this.sys.game.config.width/2, 16, 'scoreboard');
        //Add the score text
        this.add.dynamicBitmapText(5, 16, 'pixel', this.texts.score, 13).setOrigin(0, 0.5);
        //Add the real score in numbers
        this.score = this.add.dynamicBitmapText(this.sys.game.config.width-5, 16, 'pixel', Phaser.Utils.String.Pad(0,6,0,1),13).setOrigin(1,0.5);
    }

    //this will add 10 points for every food the snake eats
    addScore(){
        //this change the text shown
        this.score.setText( 
            Phaser.Utils.String.Pad(Keys.currentScore += 10,6,0,1)
        );

        //We chechk if the highscore its reached in case it is we tell the player that its a new record
        if(Keys.value.highScores.length > 0){
            if(Keys.currentScore > Keys.value.highScores[0].score && this.highscore == null){
                this.highscore = this.add.dynamicBitmapText(this.sys.game.config.width/2 , 16, 'pixel', this.texts.best, 13).setOrigin(0.5);
            }
        }
        else{
            if(this.highscore == null){
                this.highscore = this.add.dynamicBitmapText(this.sys.game.config.width/2 , 16, 'pixel', this.texts.best, 13).setOrigin(0.5);
            }
        }
    }
}

export default UI;