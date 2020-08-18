import * as THREE from "three";
import Player from '../game/player';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';
import Time from '../engine/Time';
import { Vector3 } from 'three';
import Physics from './Physics';
import GameObject from "./GameObject";

class Engine{
    constructor(){
        this.light = new THREE.DirectionalLight(0xffffff, 1);
       
        this.light.castShadow = true;
 
        this.light.shadow.mapSize.width = 2048;  
        this.light.shadow.mapSize.height = 2048;
        this.light.shadow.camera.near = 0.01;      
        this.light.shadow.camera.far = 500     
     
        var side = 10;
        this.light.shadow.camera.top = side;
        this.light.shadow.camera.bottom = -side;
        this.light.shadow.camera.left = side;
        this.light.shadow.camera.right = -side;
        this.light.position.set(0, 1, 0);
        this.light.target.position.set(-5, -5, 0);
 
        Scene.add(this.light.target);
        Scene.add(this.light);

        this.ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 ); 
        Scene.add( this.ambientLight );

        this.hotrod = new GameObject('./assets/models/hotrod.glb', false, true, true);
        this.hotrod.addRigidBody(100, Physics.createBoxShape(new Vector3(1.35, 0.776, 2.28)), new Vector3(0, 30, -5));
       
        this.player = new Player('./assets/models/chris.glb', true, true, false);
     
        this.player.addRigidBody(1, Physics.createBoxShape(new Vector3(0.5, 0.5, 0.5)), new Vector3(0, 10, 0));
        
        this.scene = new GameObject();
        this.scene.loadMesh('./assets/models/scene.glb', false, false, true)
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
      
        this.scene.addRigidBody(0, Physics.createBoxShape(new Vector3(20, 0.01, 20)), new Vector3(0, 0, 0));
  
        requestAnimationFrame(this.Animate);  
    }
  
    InitRenderer(canvas, width, height){
        this.renderer = new THREE.WebGLRenderer({canvas:canvas, alpha: false, antialias: true});
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;   
        this.renderer.cullFace = THREE.CullFaceBack;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;    
    }

    GetRenderer(){
        return this.renderer;
    }
 
    Animate = () => {  
        Time.Update();
        Scene.update();
        Physics.update();
        this.renderer.render(Scene.getScene(), Camera.mainCamera);
        const camPos = Camera.GetCamera().position;
        this.light.position.set(camPos.x + 5, 1, camPos.z + 5);
        this.light.target.position.set( -5 + camPos.x, -5, -5 + camPos.z);
        requestAnimationFrame(this.Animate);
    }
}

const GameEngine = new Engine();

export default GameEngine;