//In this class we will order every key to dont lose track of it
class Keys{
    static direction = 'cnfg';

    static maxHighscores = 9;
    static lenghtOfName = 3;

    static currentScore = 0;

    static value = {
        hitWalls : false,
        language : 0,
        highScores: []
    }
}

export default Keys;