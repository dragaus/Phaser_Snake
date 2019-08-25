//Import the requiere scripts
import Keys from '../keys.js';
import Button from '../gameobjects/button.js';
import Language from '../language.js';

//This scene ill be called hen a player gets a score that its in the top 9 of the local storage
class AddName extends Phaser.Scene{
    constructor(){
        super("AddName");
    }

    //Crete the setup to ask for the need game
    preload(){
        this.texts = Language.getText(this.scene.key);

        this.add.bitmapText(this.sys.game.config.width/2, this.sys.game.config.height/5,'pixel', this.texts.add,20).setOrigin(0.5);
        new Button(this, ()=>this.saveName(),{
            kindOfButton: 'smallButton',
            secondImage: 'tick',
            y: this.sys.game.config.height/10 * 9
        });
    }

    create(){
        //The characters need in to type a name
        this.chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
            [ 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
            [ 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '<']
        ];
        //Map pf the cursor to dtermine its position
        this.cursor = { x: 0, y: 0 };
        //This variable will storage the name of the player
        this.name = '';

        //We create an input tablke where all the characters are set in the same position thanthe array of arrays of characters
        //this will be used to determine what character is selected and placed in the game
        this.input = this.add.bitmapText(this.sys.game.config.width/2, this.sys.game.config.height/10 * 5, 'pixel', 'ABCDEFGHI\n\nJKLMNOPQR\n\nSTUVWXYZ', 18).setLetterSpacing(20);
        //This will center the input
        this.input.x -= this.input.width/2;
        this.input.y -= this.input.height/2;
        //This will make the character list interactive
        this.input.setInteractive();

        //We load a block that will be used to make the player see whta character is selected
        this.block = this.add.image(this.input.x - 8, this.input.y - 8,'block').setOrigin(0);
        
        //This will hold the name the player is setting in and show the result
        var playerText = this.add.bitmapText(this.sys.game.config.width/2, this.sys.game.config.height/20 * 15, 'pixel', name).setOrigin(0.5);

        //This is used as a variable to can acces the variables of this class inside the input
        var manager = this;

        //This set a function when the mouse is moving
        this.input.on('pointermove', function (pointer, x, y) {
            manager.setBlockInPosition(x,y);
        }, this);

        //This will set a character in the name after the click of the mouse end
        this.input.on('pointerup', function (pointer, x, y) {
            manager.setBlockInPosition(x,y);

            //If the playeer select the < character it will erase the last character set
            if (manager.char === '<' && manager.name.length > 0)
            {
                //  Rub
                manager.name = manager.name.substr(0, manager.name.length - 1);
            }
            //In case the name its not yet 3 character length we add a character
            else if (manager.name.length < 3)
            {
                //  Add
                manager.name = manager.name.concat(manager.char);
            }

            //Update 
            playerText.text = manager.name;
    
        }, this);
    }

    //This will set the block in the correct position an select the correct character
    setBlockInPosition(x, y){
        //we divide the image in the same way the characters array are set
        //so we can snap the values and obtain the ssame cjharacter as the one is impressed
        var cx = Phaser.Math.Snap.Floor(x, 38, 0, true);
        var cy = Phaser.Math.Snap.Floor(y, this.input.height/3, 0, true);
        //This is how we get the correct character
        this.char = this.chars[cy][cx];

        //This set the cursor in the correct place
        this.cursor.x = cx;
        this.cursor.y = cy;

        //This will set the block in the correct position
        this.block.x = this.input.x + (-8 + (cx * 2)) + (cx * 348/9);
        this.block.y = this.input.y + (-8 + (cy * 6)) + (cy * this.input.height/3);
    }

    //This will save the name of the player in the highscore table
    saveName(){
        //In case we have at least one highscore we enter this scoope to find its position
        if(Keys.value.highScores.length > 0){
            let pushed = false;

            //We iterate trow all the highscores to see in ich place the new score will be placed
            for(let i = 0; i < Keys.value.highScores.length;i++){
                //In case we find the correct spot we saved it we break the loop
                //and add the highscore in the correct place
                if(Keys.currentScore > Keys.value.highScores[i].score){                 
                    Keys.value.highScores.splice(i, 0, {name: this.name, score: Keys.currentScore});
                    pushed = true;
                    break;
                }
            }

            //We need to add this at last in case its needed
            if(!pushed){
                Keys.value.highScores.push({name: this.name, score: Keys.currentScore});
            }

            //In case the lenght of the list its bigger than the score we display 
            //we cut the list to the max lenght we can render
            if(Keys.value.highScores.length > Keys.maxHighscores){
                Keys.value.highScores.length = Keys.maxHighscores;
            }
        }
        //This is used only in the first values
        else{
            Keys.value.highScores.push({name: this.name, score: Keys.currentScore});
        }

        //Saves the data in the local storage and move to the game over scene
        localStorage.setItem(Keys.direction, JSON.stringify(Keys.value));
        this.scene.start('GameOver');
    }
}

export default AddName;