import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from './Scene';

export default class Mesh {
    constructor(path = null, castShadow = false, receiveShadow = false, flatShading = false) {
        this.mixer = null;
        this.action = null;
        this.meshData = null;
        this.mesh = null;
        this.scene = null;
        this.castShadow = castShadow;
        this.receiveShadow = receiveShadow;
        this.flatShading = flatShading;
        if (path !== null)
            this.LoadMesh(path);
    }

    setShadows() {

        this.scene.traverse(child => {
            if (child.isMesh) {
                child.castShadow = this.castShadow;
                child.receiveShadow = this.receiveShadow;
            }
        });
    }

    castShadow(value) {
        this.castShadow = value;
    }

    receiveShadow(value) {
        this.receiveShadow = value;
    }

    LoadMesh(path) {
        return new Promise((resolve, reject) => {
            let loader = new GLTFLoader();
            loader.load(path, (gltf) => {

                gltf.scene.traverse(child => {
                    if (child.isMesh) {
                        child.castShadow = this.castShadow;
                        child.receiveShadow = this.receiveShadow;
                        if (this.flatShading)
                            child.material.flatShading = this.flatShading;
                    }
                });

                this.scene = gltf.scene;
                this.meshData = gltf.scene.children;
                this.mesh = gltf.scene;
                this.mesh.doubleSided = false;
                Scene.add(gltf.scene);

                resolve(this);

            }, undefined, function (error) {
                console.error(error);
                reject('error');
            });
        });

    }
}
