import * as THREE from "three";
import Player from '../game/player';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';
import Time from '../engine/Time';
import { Vector3 } from 'three';
import Physics from '../engine/Physics';
import GameObject from "./GameObject";

class Engine{
    constructor(){
        this.light = new THREE.DirectionalLight(0xffffff, 3);
 
        var d = 5;
        this.light.castShadow = true;
		this.light.shadow.camera.left = - d;
		this.light.shadow.camera.right = d;
		this.light.shadow.camera.top = d;
		this.light.shadow.camera.bottom = - d;
    
		this.light.shadow.camera.near = 0.1;
		this.light.shadow.camera.far = 1000;

		this.light.shadow.mapSize.x = 1024;
		this.light.shadow.mapSize.y = 1024;
        Scene.add(this.light);
        this.target = new THREE.Object3D();
        this.light.target = this.target;

        Scene.add(this.light.target);
    
        this.light.target.translateX(0);
        this.light.target.translateY(-1);
        this.light.target.translateZ(-1);

        this.ambientLight = new THREE.AmbientLight( 0xffffff, .5 ); 
        Scene.add( this.ambientLight );
        
        this.dir = 1;
        this.player = new Player('./assets/models/chris.glb', true);
        this.player.setPosition(new Vector3(0, 100, 0));
        this.player.addRigidBody(1, Physics.createBoxShape(new Vector3(0.5, 1.0, 0.5)), new Vector3(0,10, 0));
        this.scene = new GameObject('./assets/models/scene.glb');
        this.scene.setRotation(new Vector3(0.0, 180.0, 0.0));
        this.lightDir = new THREE.Vector3(0,0,0);
        this.lightRot = 0;

        this.ground = new GameObject();
        this.ground.addRigidBody(0,  Physics.createBoxShape(new Vector3(1000, 0.25, 1000)), Vector3.zero);

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