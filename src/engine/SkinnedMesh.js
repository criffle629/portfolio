'use strict';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from './Scene';
import Time from './Time';

export default class SkinnedMesh{
    constructor(path) {
        this.mixer = null;
        this.action = null;
        this.LoadMesh(path);
    }

    async LoadMesh(path) {

        let loader = new GLTFLoader();

        let mesh = null;

        await loader.load(path, (gltf) => {
            mesh = new THREE.SkinnedMesh(gltf);
 
            this.mixer = new THREE.AnimationMixer(gltf.scene);
            this.mixer.timeScale = 1;
            let skeleton = new THREE.SkeletonHelper( gltf.scene );
            skeleton.visible = false;
            Scene.add(skeleton);
            let clip = THREE.AnimationClip.findByName(mesh, 'Walk');
            
            this.action = this.mixer.clipAction(clip);
            this.action.play();
            gltf.scene.receiveShadow = true;
            gltf.scene.castShadow = true;
            this.mesh = gltf.scene;
            Scene.add(gltf.scene);
            
        }, undefined, function (error) {
            console.error(error);
        });
    }

    Animate () { 
       
        if (this.mixer !== null){
            this.mixer.update(Time.deltaTime);
          
        }
    }


}
