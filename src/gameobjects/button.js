//This is a standart button that will have undefined function, but that could be personilized
class Button{
    constructor(scene, functionOfButton,{ 
            textOfButton = '',
            kindOfButton = 'button',
            secondImage = '',
            normalColor = '5cbf00',
            hoverColor = '458f00',
            x = scene.sys.game.config.width/2,
            y = scene.sys.game.config.height/3 *2,
            xAnchor = 0.5,
            yAnchor = 0.5
        }
    ){
        //We obtain the values that will be used in other functions
        this.scene = scene;
        this.normalColor = `0x${normalColor}`;
        this.hoverColor = `0x${hoverColor}`;
        this.unSelectedColor = `0xffffff`;
        this.functionOfButton = functionOfButton;
        this.xAnchor = xAnchor;
        this.yAnchor = yAnchor;

        this.click = this.scene.sound.add('click');
        //We add the button in the scene
        this.button = this.scene.add.image(x, y, kindOfButton).setOrigin(this.xAnchor, this.yAnchor);
        //We personolize the button with a tint to be able to create different color of buttons
        this.changeColorOut();
        //We make the button interactable
        this.button.setInteractive();
        //We add events to diferent events
        this.button.on('pointerdown', this.functionAndSound, this);  
        this.button.on('pointerover', this.changeColorOn, this);
        this.button.on('pointerout', this.changeColorOut, this);


        //We add a text into a button if its necesary
        this.buttonText = this.scene.add.dynamicBitmapText(this.button.x, this.button.y, 'pixel', textOfButton, 10).setOrigin(0.5);
        if(textOfButton == ''){
            this.buttonText.destroy();
        }

        //We add a second image if its necesary
        if(secondImage != ''){
            this.overImage = this.scene.add.image(this.button.x, this.button.y, secondImage).setOrigin(this.xAnchor, this.yAnchor);
        }
    }

    changeText(updateText){
        this.buttonText.text = updateText;
    }

    //Make button sound
    functionAndSound(){     
        this.click.play();
        this.click.once('complete', ()=>this.functionOfButton());
    }

    //This is used to return to normal color
    changeColorOut(){
        this.button.tint = this.normalColor;
    }
    
    //This is used to put color when a pointer is on
    changeColorOn(){
        this.button.tint = this.hoverColor;
    }

    addImage(imageToAdd){
        this.overImage = this.scene.add.image(this.button.x, this.button.y, imageToAdd).setOrigin(this.xAnchor, this.yAnchor);
        this.overImage.setDepth(1);
    }

    destroyImage(){
        this.overImage.destroy();
    }
}

export default Button;