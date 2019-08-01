//This will be the first scene to be launched before bootloader
//to show your logo
class SplashScreen extends Phaser.Scene{
    constructor(){
        super('SplashScreen');
    }

    preload(){
        //This will add the barrica games logo
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'BarricaGames').setScale(0.5);

    }

    create(){
        //This will set the background to black
        this.cameras.main.setBackgroundColor('#000000');

        //We create our audio
        this.audio = this.sound.add('barricaSound');
        //We play our audio
        this.audio.play();
        //Once the audio is finish we move to the next scene
        this.audio.once('complete', ()=>this.scene.start('Menu'));
    }
}

export default SplashScreen;