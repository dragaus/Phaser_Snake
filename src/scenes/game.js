//We import the game objects for this scene
import Snake from '../gameobjects/snake.js';
import Food from '../gameobjects/food.js';
import Rock from '../gameobjects/rock.js';
import Keys from '../keys.js';
import Position from "../structs/positions.js";

//This is the class where the most part of the game will be part of it this is our game
class Game extends Phaser.Scene{

    constructor(){
        super('Game');
    }

    preload(){
        //This is how we add a game object to the scene
        this.snake = new Snake(this);
        this.Food = new Food(this);
        if(Keys.value.canSpawnRocks) {
            this.rocksPosition = [];
            this.Rock = new Rock(this);
            this.rocksPosition.push(this.Rock.pos);
        }
        this.maxAmountOfRocks = 10;
        this.amountOfRocks = 0;
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
            this.snake.grow();
            this.Food.createFood();
            sceneUi.addScore();
            //If the player is playing with rocks activated here we 
            if(Keys.value.canSpawnRocks){
                if(this.amountOfRocks < this.maxAmountOfRocks && Phaser.Math.Between(0,2) === 0){
                    this.Rock.createRock();
                }
            }
        });

        //This create rocks physics if the players wants to play with the rock variation
        if(Keys.value.canSpawnRocks)
        {
            this.physics.add.collider(this.snake.body[0], this.Rock.rock, () =>{
                this.snake.gameOver();
            });
        }
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

    getRandomPos() {
        //we select a random number inside the screen to produce a new item
        //that will be clapped every 16px starting at 8 in the width and in 48 in the height
        let x = Phaser.Math.Between(0, this.sys.game.config.width);
        if(x % 16 != 8){
            x -= x % 16;
            x += 8;
        }
        let y = Phaser.Math.Between(32, this.sys.game.config.height);
        if(y % 16 != 8){
            y -= y % 16;
            y += 8;
        }

        return new Position(x, y);
    }

    isInSnakePos(positionToCheck) {
        let arrayToChekPositions = this.snake.getPositionsOfBody();

        arrayToChekPositions.forEach(position => {
            if(positionToCheck.x === position.x && positionToCheck.y === position.y){
                return true;
            }
        });
        return false;
    }

}

export default Game;