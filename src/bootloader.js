//This scene is made for loading everything needed in the game
class Bootloader extends Phaser.Scene{
    constructor(){
        super('Bootloader');
    }

    preload(){
        //Here we load the possible food for the snake
        this.load.image('food_0', 'assets/sprites/elements/Food_0.png');

        //Here we load the parts of the snake
        this.load.image('head', 'assets/sprites/elements/snake_0.png');
        this.load.image('body', 'assets/sprites/elements/snake_1.png');
        this.load.image('tail', 'assets/sprites/elements/snake_2.png');

        //Once all the loading is done we move to next part
        this.load.on('complete',()=>{
            this.scene.start('Game');
        })
    }
}

export default Bootloader;