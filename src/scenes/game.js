//We import the game objects for this scene
import Snake from '../gameobjects/snake.js';
import Food from '../gameobjects/food.js';

//This is the class where the most part of the game will be part of it this is our game
class Game extends Phaser.Scene{
    constructor(){
        super('Game');
    }

    preload(){
        //This is how we add a game object to the scene
        this.snake = new Snake(this);
        this.Food = new Food(this);
    }

    create(){
        //this is how we can add to the keys a value
        this.directionByKey('keydown_RIGHT', 'right');
        this.directionByKey('keydown_LEFT', 'left');
        this.directionByKey('keydown_UP', 'up');
        this.directionByKey('keydown_DOWN', 'down');
    }

    update(time){
        //here we move the snake
        this.snake.moveTheSnake(time)
    }

    //this method is used to set values easily
    directionByKey(keyCode, newDirection){
        this.input.keyboard.on(keyCode, ()=>{
            this.snake.changeDir(newDirection);
        });
    }
}

export default Game;