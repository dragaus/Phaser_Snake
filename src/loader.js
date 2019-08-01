//This class will provide a static method to easy change scenes
class Loader{
    static loadScene(scene, sceneToLoad){
        scene.scene.start(sceneToLoad);
    }
}

export default Loader;