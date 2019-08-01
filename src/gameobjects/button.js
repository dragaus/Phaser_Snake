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

        //We add the button in the scene
        this.button = this.scene.add.image(x, y, kindOfButton).setOrigin(xAnchor, yAnchor);
        //We personolize the button with a tint to be able to create different color of buttons
        this.changeColorOut();
        //We make the button interactable
        this.button.setInteractive();
        //We add events to diferent events
        this.button.on('pointerdown', functionOfButton, this);  
        this.button.on('pointerover', this.changeColorOn, this);
        this.button.on('pointerout', this.changeColorOut, this);

        //We add a text into a button if its necesary
        if(textOfButton != ''){
            this.scene.add.dynamicBitmapText(this.button.x, this.button.y, 'pixel', textOfButton, 10).setOrigin(0.5);
        }

        //We add a second image if its necesary
        if(secondImage != ''){
            this.scene.add.image(this.button.x, this.button.y, secondImage).setOrigin(xAnchor, yAnchor);
        }
    }

    //This is used to return to normal color
    changeColorOut(){
        this.button.tint = this.normalColor;
    }
    
    //This is used to put color when a pointer is on
    changeColorOn(){
        this.button.tint = this.hoverColor;
    }
}

export default Button;