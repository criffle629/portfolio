import * as THREE from 'three';
import Player from '../game/player';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';
import Time from '../engine/Time';
import Vector3 from './Vector3';
import Physics from './Physics';
import GameObject from './GameObject';
import Renderer from './Renderer';
import PostProcessing from './PostProcessing';
import Vehicle from './Vehicle';
import Quaternion from './Quaternion';

class Engine {
    constructor() {


        this.light = new THREE.DirectionalLight(0xffffff, 1);

        this.light.castShadow = true;

        this.light.shadow.mapSize.width = 8000;
        this.light.shadow.mapSize.height = 8000;
        this.light.shadow.camera.near = 0.01;
        this.light.shadow.camera.far = 500;
        this.light.shadow.bias = -0.00025;
        var side = 20;
        this.light.shadow.camera.top = side;
        this.light.shadow.camera.bottom = -side;
        this.light.shadow.camera.left = -side;
        this.light.shadow.camera.right = side;

       // this.light.position.set(camPos.x, 1, camPos.z + 5);
     
        this.light.target = new THREE.Object3D();
 
        Scene.setExpoFog('skyblue', 0.025);
        Scene.add(this.light.target);
        Scene.add(this.light);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        Scene.add(this.ambientLight);
        //this.hotrod = new GameObject('./assets/models/hotrod.glb', false, true, true);
       // this.hotrod.addRigidBody(100, Physics.createBoxShape(new Vector3(1.35, 0.776, 2.28)), new Vector3(0, 30, -5));


       
        this.player = new Player('./assets/models/chris.glb', true, true, true);
        this.player.addRigidBody(1, Physics.createBoxShape(new Vector3(0.5, 0.88198, 0.5)), new Vector3(0, 10, 0));

        this.ground = new GameObject('./assets/models/ground.glb', false, false, true,);
        this.ground.addRigidBody(0, Physics.createPlaneShape(Vector3.up), new Vector3(0, 0.0, 0));
    

        this.ground = new GameObject('./assets/models/garage.glb', false, true, true);
        this.ground.addRigidBody(0, Physics.createBoxShape(new Vector3(0.5, 0.88198, 0.5)), new Vector3(-25, 0, -15));

        this.mound = new GameObject('./assets/models/mound.glb', false, true, true, true);
        this.mound.addRigidBody(0, Physics.createSphereShape(3), new Vector3(0, 0, -10));

        this.vehicle = new Vehicle({
            breakForce: 100,
            accelForce: 2000,
            bodyWidth: 1.35,
            bodyHeight: 1,
            bodyLength: 2.128,
            mass: 800,
            position: new Vector3(0, 1.5, -5),
            bodyModel: './assets/models/hotrod.glb',
            wheelModel: './assets/models/hotrodwheel.glb',
            stiffness: 50.0,
            damping: 2.3,
            compression: 4.4,
            friction: 500,
            roll: 0.2,
            radius: 0.25,
            suspensionLen: 0.075,
       });
       
        requestAnimationFrame(this.Animate);
    }

    InitRenderer(canvas, width, height) {
        this.renderer = new Renderer();
        this.renderer.InitRenderer(canvas, width, height, this.Animate).then(renderer => {
            PostProcessing.init(renderer);
            PostProcessing.addFXAA();
          //  PostProcessing.addBloom(); 
            //  PostProcessing.addBokeh();
            
        });
 
    }

    GetRenderer() {
        return this.renderer.renderer;
    }

    Animate = () => {

        Time.Update();   
        Scene.update();
     
        const camPos = this.player.position;// Camera.GetCamera().position;
        this.light.position.set(camPos.x, 1, camPos.z + 5);
        this.light.target.position.set(-5 + camPos.x, -5, -5 + camPos.z);

        Physics.update();
        
        if (PostProcessing.isUsingEffects())
            PostProcessing.render();
        else
            this.renderer.Render(Scene.getScene(), Camera.mainCamera);

    }
}

const GameEngine = new Engine();

export default GameEngine;