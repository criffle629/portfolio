'use strict';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from './Scene';

export default class Mesh {
    constructor(path) {
        this.mixer = null;
        this.action = null;
        this.LoadMesh(path);
    }

    LoadMesh(path) {

        let loader = new GLTFLoader();

        loader.load(path, (gltf) => {
            gltf.scene.receiveShadow = true;
            gltf.scene.castShadow = true;

            this.mesh = gltf.scene;
            Scene.add(gltf.scene);
            
        }, undefined, function (error) {
            console.error(error);
        });
    }
}
