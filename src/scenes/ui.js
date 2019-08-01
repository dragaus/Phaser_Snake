//This scene will hold all the data related to the score of a game in progress
class UI extends Phaser.Scene{
    constructor(){
        super('UI');
    }

    create(){
        //Create the scoreboard and center it
        this.add.image(this.sys.game.config.width/2, 16, 'scoreboard');
        //Add the score text
        this.add.dynamicBitmapText(5, 16, 'pixel', 'SCORE', 13).setOrigin(0, 0.5);
        //Add the real score in numbers
        this.score = this.add.dynamicBitmapText(this.sys.game.config.width-5, 16, 'pixel', Phaser.Utils.String.Pad(0,6,0,1),13).setOrigin(1,0.5);
    }

    //this will add 10 points for every food the snake eats
    addScore(){
        //this change the text shown
        this.score.setText( 
            Phaser.Utils.String.Pad(parseInt(this.score.text)+10,6,0,1) 
        ); 
    }
}

export default UI;