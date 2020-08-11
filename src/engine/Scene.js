import * as THREE from "three";
import GameObect from './GameObject';
import Camera from './Camera';

class SceneManager{

    constructor(){
        this.scene = new THREE.Scene();
        this.enabledObjects = {};
        this.disabledObjects = {};
        this.screenWidth = 1024;
        this.screenHeight = 600;
        this.aspectRatio = 1024 / 600;
    }
    
    add(obj){
        this.scene.add(obj);
    }

    addGameObject(obj){

        if (obj.objID in this.disabledObjects)
            this.enableObject(obj);
        else
        if (!(obj.objID in this.enableObject))
            this.enabledObjects[obj.objID] = obj;
    }   

    getScene(){
        return this.scene;
    }

    enableObject(obj){
        if (obj.objID in this.disabledObjects){
            this.enabledObjects[obj.objID] = obj;
            delete this.disabledObjects[obj.objID];
        }
    }

    disableObject(obj){
        if (obj.objID in this.enableObjects){
            this.disabledObjects[obj.objID] = obj;
            delete this.enabledObjects[obj.objID];
        }
    }

    update(){

        for (let obj in this.enabledObjects){
            this.enabledObjects[obj].update();
        }

        for (let obj in this.enabledObjects){
            this.enabledObjects[obj].render();
        }
    }

    setScreenSize(width, height){
        this.screenWidth = width;
        this.screenHeight = height;

        this.aspectRatio = width / height;
    }
}

const Scene =  new SceneManager();

export default Scene;