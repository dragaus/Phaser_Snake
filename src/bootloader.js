//This scene is made for loading everything needed in the game
class Bootloader extends Phaser.Scene{
    constructor(){
        super('Bootloader');
    }

    preload(){
        console.log('this is bootloader')
    }
}

export default Bootloader;