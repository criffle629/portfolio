import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from './Scene';
import * as THREE from 'three';
//import { isMobile } from 'react-device-detect';

const isMobile = false;

export default class Mesh {
    constructor(path = null, castShadow = false, receiveShadow = false, flatShading = false, culling = true) {
        this.mixer = null;
        this.action = null;
        this.meshData = null;
        this.mesh = null;
        this.scene = null;
        this.culling = culling;
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
        Scene.objectLoading++;

        return new Promise((resolve, reject) => {
            let loader = new GLTFLoader();
            loader.load(path, (gltf) => {
              
                gltf.scene.traverse(child => {
                    if (child.isMesh) {
                        child.castShadow = this.castShadow;
                        child.receiveShadow = this.receiveShadow;
                        if (this.culling)
                            child.material.side = THREE.FrontSide;
                        if (this.flatShading)
                            child.material.flatShading = this.flatShading;
 
                        if (child.material.map && !isMobile){
                            child.material.map.anisotropy = 16
                        }
                        else
                        if (child.material.map && isMobile){
                            
                            child.material.map.anisotropy = 1;
                            child.material.map.minFilter = THREE.NearestFilter;
                            child.material.map.magFilter = THREE.NearestFilter;
                        }
                    }
                });

                this.scene = gltf.scene;
                this.meshData = gltf.scene.children;
                this.mesh = gltf.scene;
                this.mesh.doubleSided = false;
                Scene.add(gltf.scene);
                Scene.objectLoaded++;
                resolve(this);

            }, undefined, function (error) {
                console.error(error);
                Scene.objectLoading--;
                reject('error');
            });
        });

    }

    isLoaded(){
        return this.mesh === null;
    }
}
