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
        //add a scene that overlaps the current scene
        this.scene.launch('UI');
        const sceneUi = this.scene.get('UI');

        //this is how we can add to the keys a value
        this.directionByKey('keydown_RIGHT', 'right');
        this.directionByKey('keydown_LEFT', 'left');
        this.directionByKey('keydown_UP', 'up');
        this.directionByKey('keydown_DOWN', 'down');
        this.directionByKey('keydown_D', 'right');
        this.directionByKey('keydown_A', 'left');
        this.directionByKey('keydown_W', 'up');
        this.directionByKey('keydown_S', 'down');

        //This add touch control
        this.changeDirectionByTouch(this);

        //This add a physics collision to any member of the group food inside our Food script
        //this way we only have to call the function once instead of adding it every time
        this.physics.add.collider(this.snake.body[0], this.Food.food, ()=>{
            this.Food.createFood();
            this.snake.grow();
            sceneUi.addScore();
        });
    }

    update(time){
        //here we move the snake
        this.snake.moveTheSnake(time);
    }

    //this method is used to set values easily
    directionByKey(keyCode, newDirection){
        this.input.keyboard.on(keyCode, ()=>{
            this.snake.changeDir(newDirection);
        });
    }

    //We need to pass the scene to use it as a reference
    changeDirectionByTouch(scene){
        //this will add an event when the pointer or touch gets up
        this.input.on('pointerup', function(pointer){
            //this creates a variable of the new direction for the snake
            var newDir = 'right';

            //Here we will get the distance of the touch and determine
            //etheir by long of the distance if the player want a horizontal or vertical movement
            if(pointer.getDistanceX() > pointer.getDistanceY()){
                //Now we determine if the first position was at left
                //then the move were made to the right and vice versa
                if(pointer.downX < pointer.upX){
                    newDir = 'right';
                }
                else{
                    newDir = 'left';
                }
            }
            else{
                //Now we determine if the first position was at down
                //then the move were made in the up direction and vice versa
                if(pointer.downY < pointer.upY){
                    newDir = 'down';
                }
                else{
                    newDir = 'up';
                }
            }

            //we get the snake in the scene and change its direction
            scene.snake.changeDir(newDir);
        });
    }

}

export default Game;