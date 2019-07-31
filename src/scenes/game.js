//This is the class where the most part of the game will be part of it this is our game
class Game extends Phaser.Scene{
    constructor(){
        super('Game');
    }

    preload(){
        this.add.image(24, 24, 'food_0');
    }

    create(){

    }
}

export default Game;