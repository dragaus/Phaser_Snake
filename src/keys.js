//In this class we will order every key to dont lose track of it
class Keys{
    static direction = 'cnfg';

    static maxHighscores = 9;
    static lenghtOfName = 3;

    static numberOfFoods = 4;
    static numberOfRocks = 3;
    static maxAmountOfRocks = 10;
    static currentScore = 0;

    static value = {
        hitWalls : false,
        canSpawnRocks: true,
        language : 0,
        highScores: []
    }
}

export default Keys;