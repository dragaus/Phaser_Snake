//Import the requiered elements
import Keys from './keys.js';
import EN from './languages/en.js';
import ES from './languages/es.js';

//This class will help to select the correct language of the game
class Language{

    //We willobtain the map of the page in the specific language
    //Language codes are 0 english 1 spanish
    static getText(pageText){
        switch(Keys.value.language){
            case 0:
                return EN[pageText];
            case 1:
                return ES[pageText];
        }
    }

    //this is used in the configuration menu when we add a language e have to move this value too
    static languageNumber = 2;
}

export default Language;