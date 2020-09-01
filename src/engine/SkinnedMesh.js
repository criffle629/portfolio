import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from './Scene';
import Time from './Time';
import GameEngine from "./GameEngine";

export default class SkinnedMesh {

    constructor(path, castShadow = false, receiveShadow = false, flatShading = false) {
        this.mixer = null;
        this.action = null;
        this.meshData = null;
        this.mesh = null;
        this.anim = null;
        this.scene = null;
        this.currentAnimation = '';
        this.castShadow = castShadow;
        this.receiveShadow = receiveShadow;
        this.LoadMesh(path, flatShading);
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
        GameEngine.AddCallback(this.setShadows(value));

    }

    receiveShadow(value) {
        this.receiveShadow = value;
        GameEngine.AddCallback(this.setShadows(value));
    }

    async LoadMesh(path, flatShading = false) {

        let loader = new GLTFLoader();

        await loader.load(path, (gltf) => {
            this.meshData = new THREE.SkinnedMesh(gltf);

            this.mixer = new THREE.AnimationMixer(gltf.scene);
            this.mixer.timeScale = 1;

            let skeleton = new THREE.SkeletonHelper(gltf.scene);
            skeleton.visible = false;
            Scene.add(skeleton);

            gltf.scene.traverse(child => {

                if (child.isMesh) {

                    child.castShadow = this.castShadow;
                    child.receiveShadow = this.receiveShadow;

                    if (flatShading)
                        child.material.flatShading = flatShading;
                }
            });

            this.scene = gltf.scene;
            this.meshData = gltf.scene.children;
            this.mesh = gltf.scene;
            this.anim = gltf;

            Scene.add(gltf.scene);

        }, undefined, function (error) {
            console.error(error);
        });
    }

    playAnimation(animation) {

        if (this.meshData === null)
            return;

        if (this.currentAnimation !== animation) {
            this.currentAnimation = animation;
            let clip = THREE.AnimationClip.findByName(this.anim, animation);

            if (this.action !== null)
                this.action.stop();

            this.action = this.mixer.clipAction(clip);

            if (this.action !== null)
                this.action.play();
        }
    }

    Animate() {

        if (this.mixer !== null) {
            this.mixer.update(Time.deltaTime);

        }
    }
}
