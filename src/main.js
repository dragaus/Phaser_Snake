//Here we will import every scene its needed in this game
import Bootloader from './bootloader.js';
import Game from './scenes/game.js';
import GameOver from './scenes/gameover.js';
import UI from './scenes/ui.js';

//This class will have all the information for the Phaser game configuration and initialization
//In the scene parameter we find an array this array will hold all the scenes that we can access
//But the first scene in the array it will always will be loaded first thats the reasos why Bootloader will be the first
const config = {
    title: 'snake',
    width: 512,
    height: 288,
    Type: Phaser.AUTO,
    parent: container,
    backgroundColor: '#acd620',
    pixelArt: true,
    physics:{
        default: 'arcade',
    },
    scene:[Bootloader, Game, GameOver, UI]
}

new Phaser.Game(config);