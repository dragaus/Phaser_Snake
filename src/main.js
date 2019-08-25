//Here we will import every scene its needed in this game
import AddName from './scenes/addname.js';
import Bootloader from './bootloader.js';
import Config from './scenes/config.js';
import Credits from './scenes/credits.js';
import Game from './scenes/game.js';
import GameOver from './scenes/gameover.js';
import HighScore from './scenes/highscore.js';
import Menu from './scenes/menu.js';
import SplashScren from './scenes/splashscreen.js';
import UI from './scenes/ui.js';

//This class will have all the information for the Phaser game configuration and initialization
//In the scene parameter we find an array this array will hold all the scenes that we can access
//But the first scene in the array it will always will be loaded first thats the reasos why Bootloader will be the first
const config = {
    title: 'snake',
    width: 512,
    height: 288,
    Type: Phaser.AUTO,
    parent: 'container',
    backgroundColor: '#acd620',
    pixelArt: true,
    physics:{
        default: 'arcade',
    },
    //This will make the game responsive to any size of screen
    scale:{
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 512,
        height: 288
    },
    scene:[Bootloader, AddName, Config, Credits, Menu, Game, GameOver, HighScore, SplashScren, UI]
}

new Phaser.Game(config);