//This scene is made for loading everything needed in the game
class Bootloader extends Phaser.Scene{
    constructor(){
        super('Bootloader');
    }

    preload(){
        this.load.image('food_0', 'assets/sprites/elements/Food_0.png');

        this.load.on('complete',()=>{
            this.scene.start('Game');
        })
    }
}

export default Bootloader;