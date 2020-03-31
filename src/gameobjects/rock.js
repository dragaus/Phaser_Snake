import Keys from "../keys.js";
import Position from "../structs/positions.js";

//This will be called to generate a rock
class Rock{
    constructor(scene){
        this.scene = scene;
        this.pos = new Position();
        this.randomRockPos();
        //We create a group to determinate easily the physics properties
        this.rock = this.scene.physics.add.group({
            //We used a random number between 0 and numberOfRocks (this random includes numberOfRocks) to select a random rock
            key: `rock_${Phaser.Math.Between(0, Keys.numberOfRocks - 1)}`,
            //Initial position of the rock
            setXY:{
                x: this.pos.x,
                y: this.pos.y
            }
        });

        //We need to set depth to -1 to make the snake to be always render over the rock
        this.rock.getChildren()[0].setDepth(-1);
    }

    createRock() {
        this.randomRockPos()

        //We create one of the random rocks
        this.rock.create(this.pos.x , this.pos.y,`rock_${Phaser.Math.Between(0, Keys.numberOfRocks - 1)}`);

        //We need to set depth to -1 to make the snake to be always render over the rock
        this.rock.getChildren()[0].setDepth(-1);
    }

    randomRockPos() {
        this.pos = this.scene.getRandomPos();

        while(this.scene.isInSnakePos(this.pos)) {
            this.pos = this.scene.getRandomPos();
        }
    }
}

export default Rock;