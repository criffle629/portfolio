import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from './Scene';
import Time from './Time';

export default class SkinnedMesh{

    constructor(path) {
        this.mixer = null;
        this.action = null;
        this.meshData = null;
        this.mesh = null;
        this.currentAnimation = '';
        this.LoadMesh(path);
    }

    async LoadMesh(path) {

        let loader = new GLTFLoader();

        await loader.load(path, (gltf) => {
            this.meshData = new THREE.SkinnedMesh(gltf);
 
            this.mixer = new THREE.AnimationMixer(gltf.scene);
            this.mixer.timeScale = 1;

            let skeleton = new THREE.SkeletonHelper( gltf.scene );
            skeleton.visible = false;
            Scene.add(skeleton);
    
            gltf.scene.receiveShadow = true;
            gltf.scene.castShadow = true;
            this.meshData = gltf.scene.children;
            this.mesh = gltf.scene;
            Scene.add(gltf.scene);
            
        }, undefined, function (error) {
            console.error(error);
        });
    }

    playAnimation(animation){

        if (this.meshData === null)
            return;

        if (this.currentAnimation !== animation)
        {
            this.currentAnimation = animation;
            let clip = THREE.AnimationClip.findByName(this.meshData, animation);
            
            if (this.action !== null)
                this.action.stop();

            this.action = this.mixer.clipAction(clip);
           
            if (this.action !== null)
                this.action.play();
        }
    }

    Animate () { 
       
        if (this.mixer !== null){
            this.mixer.update(Time.deltaTime);
          
        }
    }
}
