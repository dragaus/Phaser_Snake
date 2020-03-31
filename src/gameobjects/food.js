import Keys from "../keys.js";
import Position from "../structs/positions.js";

//This class will generate all the food that the snake can eat
class Food{
    //To get the phaser properties we need to pass the scene to this object
    constructor(scene){
        this.scene = scene;
        this.pos = new Position();
        this.randomFoodPos();
        //We create a group to determinate easily the physics properties
        this.food = this.scene.physics.add.group({
            //We used a random number between 0 and 3 (this random includes 3) to select a random food
            key: `food_${Phaser.Math.Between(0, Keys.numberOfFoods - 1)}`,
            //Initial position of the food
            setXY:{
                x: this.pos.x,
                y: this.pos.y
            }
        });

        //We need to set depth to -1 to make the snake to be always render over the food
        this.food.getChildren()[0].setDepth(-1);
    }

    createFood(){
        
        //we select a random number inside the screen to produce a new food
        //that will be clapped every 16px starting at 8 in the width and in 48 in the height
        this.randomFoodPos();

        //When we create a new food first we have to destroy the current one
        this.food.getChildren()[0].destroy();
        //We create one of the random foods
        this.food.create(this.pos.x, this.pos.y, `food_${Phaser.Math.Between(0, Keys.numberOfFoods - 1)}`);

        //We need to set depth to -1 to make the snake to be always render over the food
        this.food.getChildren()[0].setDepth(-1);
    }

    randomFoodPos() {
        this.pos = this.scene.getRandomPos();

        while(this.scene.isInSnakePos(this.pos)) {
            this.pos = this.scene.getRandomPos();
        }
    }

    isSomethingInThatPos(possiblePosition){
        let arrayToChekPositions = this.scene.snake.getPositionsOfBody();
        var isInThatPosSomething = false;
        arrayToChekPositions.forEach(position => {
            if(possiblePosition.x === position.x && possiblePosition.y === possiblePosition.y){
                isInThatPosSomething = true;
                return isInThatPosSomething;
            }
        });
        return isInThatPosSomething;
    }
}

export default Food;