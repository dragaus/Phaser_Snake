//This class will generate all the food that the snake can eat
class Food{
    //To get the phaser properties we need to pass the scene to this object
    constructor(scene){
        this.scene = scene;

        //We create a group to determinate easily the physics properties
        this.food = this.scene.physics.add.group({
            //We used a random number between 0 and 3 (this random includes 3) to select a random food
            key: `food_${Phaser.Math.Between(0, 3)}`,
            //Initial position of the food
            setXY:{
                x: 56,
                y: 56
            }
        });

        //We need to set depth to -1 to make the snake to be always render over the food
        this.food.getChildren()[0].setDepth(-1);
    }

    createFood(){
        
        //we select a random number inside the screen to produce a new food
        //that will be clapped every 16px starting at 8 in the width and in 48 in the height
        let x = Phaser.Math.Between(0, this.scene.sys.game.config.width);
        if(x % 16 != 8){
            x -= x % 16;
            x += 8;
        }
        let y = Phaser.Math.Between(32, this.scene.sys.game.config.height);
        if(y % 16 != 8){
            y -= y % 16;
            y += 8;
        }
        //When we create a new food first we have to destroy the current one
        this.food.getChildren()[0].destroy();
        //We create one of the random foods
        this.food.create(x,y,`food_${Phaser.Math.Between(0, 3)}`);

        //We need to set depth to -1 to make the snake to be always render over the food
        this.food.getChildren()[0].setDepth(-1);
    }
}

export default Food;