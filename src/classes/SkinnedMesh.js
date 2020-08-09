'use strict';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock } from 'three';
import GameObject from "./GameObject";
import Scene from '../classes/Scene';

export default class SkinnedMesh extends GameObject{
    constructor(path, clock) {
        super();
        this.mixer = null;

        this.clock = clock;
        this.action = null;
        this.LoadMesh(path);
    }

    LoadMesh(path) {

        let loader = new GLTFLoader();

        let mesh = null;

        loader.load(path, (gltf) => {
            mesh = new THREE.SkinnedMesh(gltf);
 
            this.mixer = new THREE.AnimationMixer(gltf.scene);
            this.mixer.timeScale = 2000;
            let skeleton = new THREE.SkeletonHelper( gltf.scene );
            skeleton.visible = false;
            Scene.add(skeleton);
            let clip = THREE.AnimationClip.findByName(mesh, 'Walk');
            
            this.action = this.mixer.clipAction(clip);
            this.action.play();
            gltf.scene.receiveShadow = true;
            gltf.scene.castShadow = true;
            
            Scene.add(gltf.scene);
            
        }, undefined, function (error) {
            console.error(error);
        });
    }

    Animate (deltaTime) { 
       
        if (this.mixer !== null){
            this.mixer.update(this.clock.getDelta());
          
        }
    }


}
