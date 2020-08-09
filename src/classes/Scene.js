'use strict';
import * as THREE from "three";

class SceneManager{
    constructor(){
        this.scene = new THREE.Scene();
    }

    createScene(){
       
    }
    add(obj){
        this.scene.add(obj);
    }

    getScene(){
        return this.scene;
    }
}

const Scene =  new SceneManager();
Object.freeze(Scene);

export default Scene;