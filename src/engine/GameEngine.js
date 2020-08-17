import * as THREE from "three";
import Player from '../game/player';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';
import Time from '../engine/Time';
import { Vector3 } from 'three';
import Physics from '../engine/Physics2';
import GameObject from "./GameObject";

class Engine{
    constructor(){
        this.target = new THREE.Object3D();
        this.light = new THREE.DirectionalLight(0xffffff, 3);
        this.light.castShadow = true;
        this.light.target = this.target;    
        this.light.target.translateX(0);
        this.light.target.translateY(-1);
        this.light.target.translateZ(-1);
  
        Scene.add(this.light);
        Scene.add(this.light.target);

        this.ambientLight = new THREE.AmbientLight( 0xffffff, .5 ); 
        Scene.add( this.ambientLight );

        this.player = new Player('./assets/models/chris.glb', true);
        this.player.setPosition(new Vector3(0,100, 0));
        this.player.addRigidBody(1, Physics.createBoxShape(new Vector3(0.5, 0.5, 0.5)), new Vector3(0, 100, 0));
     
        this.scene = new GameObject();
        this.scene.loadMesh('./assets/models/scene.glb')
        .then(obj => {
            this.scene.model = obj;
             
            /*Physics.createMeshShape(this.scene.model.meshData)
            .then(shape => {
                this.scene.addRigidBody(0, shape, Vector3.zero);
            })
            .catch(e => {
                console.log(e);
            });*/
        })
        .catch(e => {
            console.log(e);
        });
        this.scene.addRigidBody(0, Physics.createBoxShape(new Vector3(1000, 0.5, 1000)), new Vector3(0, 5, 0));
        requestAnimationFrame(this.Animate);  
    }
  
    InitRenderer(canvas, width, height){
        this.renderer = new THREE.WebGLRenderer({canvas:canvas, alpha: false, antialias: true});
        this.renderer.setSize(width, height);
    }

    GetRenderer(){
        return this.renderer;
    }

    Animate = () => {  
        Time.Update();
        Scene.update();
        Physics.update();
        this.renderer.render(Scene.getScene(), Camera.mainCamera);
        requestAnimationFrame(this.Animate);
    }
}

const GameEngine = new Engine();

export default GameEngine;