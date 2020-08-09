'use strict';
import * as THREE from "three";

class SceneManager{
    constructor(){
        this.scene = null;
    }

    createScene(){
        this.scene = new THREE.Scene();
    }
    add(obj){
        this.scene.add(obj);
    }

    getScene(){
        return this.scene;
    }
}

const Scene =  new SceneManager();

export default Scene;