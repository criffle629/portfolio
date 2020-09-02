import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Scene from './Scene';
import Time from './Time';
 

export default class SkinnedMesh {

    constructor(path, castShadow = false, receiveShadow = false, flatShading = false) {
        this.mixer = null;
        this.action = null;
        this.meshData = null;
        this.mesh = null;
        this.anim = null;
        this.scene = null;
        this.currentAnimation = '';
        this.bones = [];
        this.ragdollActivated = false;

        this.castShadow = castShadow;
        this.receiveShadow = receiveShadow;
        this.flatShading = flatShading;
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
        this.updateScene();
    }

    receiveShadow(value) {
        this.receiveShadow = value;
        this.updateScene();
    }

    updateScene(){
       this.scene.traverse(child => {

            if (child.isMesh) {

                child.castShadow = this.castShadow;
                child.receiveShadow = this.receiveShadow;

                if (this.flatShading)
                    child.material.flatShading = this.flatShading;
            }
        });
    }
    async LoadMesh(path, flatShading = false) {

        let loader = new GLTFLoader();

        this.flatShading = flatShading;
        await loader.load(path, (gltf) => {
            this.meshData = new THREE.SkinnedMesh(gltf);

            this.mixer = new THREE.AnimationMixer(gltf.scene);
            this.mixer.timeScale = 1;
 
            gltf.scene.traverse(child => {
/*
                if (child.isBone) {
                    console.log(child);

                    const quat = child.quaternion;
                    let pos = child.position;
                    pos = new Vector3(pos.x, pos.y, pos.z);
            

                    this.bones.push({
                        bone:child,
                        body: new RigidBody(new Vector3(pos.x, pos.y, pos.z), Phsyics.createCapsuleShape(0.051, 0.051, Vector3.forward), new Quaternion(quat.x, quat.y, quat.z, quat.w), {
                        mass: 0.0,
                        friction: 1,
                        rollingFriction: 0,
                        restitution: 0
                        })
                        });
                }
*/
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

    SetRagdollActive(value){

        this.ragdollActivated = value;
        for (let i = 0; i < this.bones.length; i++)
        {   
            if (this.bones[i].body !== null){
                const mass = value ? 0.25 : 0;
                this.bones[i].body.setMass(mass);
            }
        }
    }

    Animate() {

     /*

        for (let i = 0; i < this.bones.length; i++)
        {
            if (this.bones[i].body !== null && this.bones[i].body.mass > 0){
            
                const rot = this.bones[i].body.GetRotation().Euler();
                const pos = this.bones[i].body.GetPosition();
                this.bones[i].bone.rotation.set(rot.x, rot.y, rot.z);
                this.bones[i].bone.position.set(pos.x, pos.y, pos.z);
            }
        }
*/
        if (this.mixer !== null && !this.ragdollActivated) {
            this.mixer.update(Time.deltaTime);
        }
    }
}
