//This is the class snake this is the one that will handle all the sanke related issues
class Snake{

    //To get the phaser properties we need to pass the scene to this object
    constructor(scene){
        this.scene = scene;

        //we create an array where all the parts of the snake will be added
        //and determine the number of body parts the snake will have at first
        this.initialBodyParts = 3;
        this.body = [];

        //we set the initial position of the head and this will help us to set the parts of the body correctly
        this.initialPosx = this.scene.sys.game.config.width-8 -16;
        this.initialPosy = this.scene.sys.game.config.height -8 -(16 * this.initialBodyParts);

        //this parameters will be used in the snake movement
        this.dir = 'up';
        this.newDir = 'up';
        this.timer = 0;
        this.movingSpeed = 200;

        //here we add the head of the sanke
        this.pushABodyPart('head');
        //we do a loop adding all the body parts between the head and the tail
        for(let i =1; i < this.initialBodyParts-1;i++){
            this.pushABodyPart('body');
        }
        //finally we add the tail to the snake
        this.pushABodyPart('tail');

    }

    //this method is used to set the initial body parts of the snake
    pushABodyPart(kindOfPart){
        this.body.push(this.scene.physics.add.image(this.initialPosx, this.initialPosy, kindOfPart));
        this.initialPosy +=16;
    }

    //This method is used to change the direction of the next move
    changeDir(newDir){
        if(this.canChangeTheDir(newDir)){
            this.newDir = newDir
        }
    }

    //this method is used to avoid change the body to the same axis and cause a loose
    canChangeTheDir(newDir){
        var axisIsHorizontal = this.dir == 'right' || this.dir == 'left';
        var newAxisIsHorizontal = newDir == 'right' || newDir == 'left';
        return axisIsHorizontal != newAxisIsHorizontal;
    }

    //this method will be called in the update loop of our game.js and will move the snake
    moveTheSnake(time){

        //We will only in specific occasions and the base of the movement will be the head
        if(this.timer < time){
            //This will made the body to follow the head
            for(let i = this.body.length-1; i > 0; i --){
                this.body[i].x = this.body[i-1].x;
                this.body[i].y = this.body[i-1].y;

                this.body[i].angle = this.body[i-1].angle;
            }

            //this change the direction of the snake in case the player change it
            if(this.newDir != this.dir){
                this.dir = this.newDir;
                //This switch will help to change the angle of the head when a direction change
                //to create a better effect in the animation
                switch(this.dir){
                    case 'right':
                        this.body[0].angle = 90;
                        break;
                    case 'left':
                        this.body[0].angle = -90;
                        break;
                    case 'up':
                        this.body[0].angle = 0;
                        break;
                    case 'down':
                        this.body[0].angle = 180;
                        break;
                }
            }

            //The head can be move in any of this four directions
            //Remember the scene will have an anchor in the top left corner
            //thats the reson why the up movement is negative instead of positive
            switch(this.dir){
                case 'right':
                    this.body[0].x += 16;
                    break;
                case 'left':
                    this.body[0].x -= 16;
                    break;
                case 'up':
                    this.body[0].y -= 16;
                    break;
                case 'down':
                    this.body[0].y += 16;
                    break;
            }

            //this will make that the snake wrap the canvas
            //we wrap the snake in the y axis in 32 because eventually there will be a ui element
            this.body[0].x = Phaser.Math.Wrap(this.body[0].x, 0, this.scene.sys.game.config.width);
            this.body[0].y = Phaser.Math.Wrap(this.body[0].y, 32, this.scene.sys.game.config.height);

            //when the condition was match we need to set a new condition to keep the loop
            this.timer = time + this.movingSpeed;
        }
    }
}

export default Snake;