//This class will manage the game over and send you back to the main menu
class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver');
    }

    preload(){
        console.log('Game Over');
    }
}

export default GameOver;