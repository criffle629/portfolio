import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from './Scene';

export default class Mesh {
    constructor(path = null) {
        this.mixer = null;
        this.action = null;
        this.meshData = null;
        this.mesh = null;

        if (path !== null)
            this.LoadMesh(path);
    }

    LoadMesh(path) {
        return new Promise((resolve, reject) => {
            let loader = new GLTFLoader();
            loader.load(path, (gltf) => {

                gltf.scene.receiveShadow = true;
                gltf.scene.castShadow = true;
                this.meshData = gltf.scene.children;
                this.mesh = gltf.scene;
                
                Scene.add(gltf.scene);

                resolve(this);
    
            }, undefined, function (error) {
                console.error(error);
                reject('error');
            });
        });

    }
}
