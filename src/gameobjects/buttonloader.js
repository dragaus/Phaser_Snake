//impor the element from wich this object extends
import Button from './button.js';

//here we create an exact button with the diferences that this button will only be used to call change of scenes
//so insted of a function we recibe the name of the scene we want to
class ButtonLoader extends Button{
    constructor(scene, sceneToGo,{ 
        textOfButton = '',
        kindOfButton = 'button',
        secondImage = '',
        normalColor = '5cbf00',
        hoverColor = '458f00',
        x = scene.sys.game.config.width/2,
        y = scene.sys.game.config.height/3 *2,
        xAnchor = 0.5,
        yAnchor = 0.5
    }){
        super(scene, ()=>scene.scene.start(sceneToGo),{
            textOfButton: textOfButton,
            kindOfButton: kindOfButton,
            secondImage: secondImage,
            normalColor: normalColor,
            hoverColor: hoverColor,
            x: x,
            y: y,
            xAnchor: xAnchor,
            yAnchor: yAnchor
        });
    }
}

export default ButtonLoader;