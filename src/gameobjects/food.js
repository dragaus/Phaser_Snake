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
}

export default Food;