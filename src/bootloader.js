//This scene is made for loading everything needed in the game
class Bootloader extends Phaser.Scene{
    constructor(){
        super('Bootloader');
    }

    preload(){
        //Here we load the possible food for the snake
        for(let i = 0; i < 4; i++){
            var number = i;
            this.load.image(`food_${number}`, `assets/sprites/elements/Food_${number}.png`);
        }

        //Here we load the parts of the snake
        this.load.image('head', 'assets/sprites/elements/snake_0.png');
        this.load.image('body', 'assets/sprites/elements/snake_1.png');
        this.load.image('tail', 'assets/sprites/elements/snake_2.png');

        //Here we load the UI elements
        this.load.image('scoreboard', 'assets/sprites/UI/scoreboard.png');
        this.load.image('button', 'assets/sprites/UI/button.png');
        this.load.image('smallButton', 'assets/sprites/UI/button_small.png');
        this.load.image('return', 'assets/sprites/UI/return.png');

        //This will load a json and image needed to use bitmap for fonts
        this.load.json('fontJSON', './assets/font/font.json'); 
        this.load.image('font', './assets/font/font.png'); 

        //Once all the loading is done we move to next part
        this.load.on('complete',()=>{

            //This is how we get a font by bitmap its generated after all the loading and before the change of scene
            //the json contains all the information of how the image should be used to create what Character and
            // the bit map font generate a font saved and which name will have inside the project
            const fontJSON = this.cache.json.get('fontJSON'); 
            this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJSON)); 

            //Create the first scene after loading
            this.scene.start('GameOver');
        })
    }
}

export default Bootloader;