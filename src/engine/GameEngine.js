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

class Engine {
    constructor() {

        this.light = new THREE.DirectionalLight(0xffffff, 1);

        this.light.castShadow = true;

        this.light.shadow.mapSize.width = 8000;
        this.light.shadow.mapSize.height = 8000;
        this.light.shadow.camera.near = 0.01;
        this.light.shadow.camera.far = 500;
        this.light.shadow.bias = -0.00025;
        let side = 20;
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

        this.player = new Player('player', './assets/models/chris.glb', true, true, true);
        this.player.addRigidBody(1, Physics.createBoxShape(new Vector3(0.5, 0.88198, 0.5)), new Vector3(0, 10, 0));

        this.ground = new GameObject('ground', './assets/models/ground.glb', false, false, true,);
        this.ground.addRigidBody(0, Physics.createPlaneShape(Vector3.up), new Vector3(0, 0.0, 0));

        this.garage = new GameObject('garage', './assets/models/garage.glb', false, true, true);
        this.garage.addRigidBody(0, Physics.createBoxShape(new Vector3(0.5, 0.88198, 0.5)), new Vector3(-25, 0, -15));

        this.mound = new GameObject('mound', './assets/models/mound.glb', false, true, true, true);
        this.mound.addRigidBody(0, Physics.createSphereShape(3), new Vector3(0, 0, -10));

        Camera.target = this.player;


        this.vehicle2 = new Vehicle({
            breakForce: 25,
            accelForceFront: 0,
            accelForceBack: 50,
            bodyWidth: 1.35,
            bodyHeight: 1,
            bodyLength: 2.128,
            mass: 150,
            position: new Vector3(5, 1.5, -5),
            bodyModel: './assets/models/classicbug.glb',
            wheelLeftModel: './assets/models/classicbugwheelLeft.glb',
            wheelRightModel: './assets/models/classicbugwheelRight.glb',
            wheelModel: './assets/models/.glb',
            stiffness: 250.0,
            damping: 2.3,
            compression: 1.4,
            friction: 100,
            roll: .25,
            radius: 0.25,
            suspensionLen: 0.075,
            backLeftPos: new Vector3(-0.4, -0.2, -0.654),
            backRightPos: new Vector3(0.4, -0.2, -0.654),
            frontRightPos: new Vector3(0.38, -0.2, 0.719),
            frontLeftPos: new Vector3(-0.38, -0.2, 0.719),
        });


        this.vehicle = new Vehicle({
            breakForce: 25,
            accelForceFront: 0,
            accelForceBack: 50,
            bodyWidth: 1.35,
            bodyHeight: 1,
            bodyLength: 2.128,
            mass: 300,
            position: new Vector3(0, 1.5, -5),
            bodyModel: './assets/models/hotrod.glb',
            wheelLeftModel: './assets/models/hotrodwheelLeft.glb',
            wheelRightModel: './assets/models/hotrodwheelRight.glb',
            stiffness: 50.0,
            damping: 2.3,
            compression: 2.4,
            friction: 5000,
            roll: 0.06,
            radius: 0.25,
            suspensionLen: 0.075,
            backLeftPos: new Vector3(-0.524, -0.309, -0.654),
            backRightPos: new Vector3(0.524, -0.309, -0.654),
            frontRightPos: new Vector3(0.524, -0.309, 0.719),
            frontLeftPos: new Vector3(-0.524, -0.309, 0.719),
        });


        this.vehicle3 = new Vehicle({
            breakForce: 25,
            accelForceFront: 25,
            accelForceBack: 25,
            bodyWidth: 1.35,
            bodyHeight: 1,
            bodyLength: 2.128,
            mass: 200,
            position: new Vector3(-5, 1.5, -5),
            bodyModel: './assets/models/sportscar.glb',
            wheelLeftModel: './assets/models/sportscarwheelLeft.glb',
            wheelRightModel: './assets/models/sportscarwheelRight.glb',
            stiffness: 50.0,
            damping: 2.3,
            compression: 2.4,
            friction: 5000,
            roll: 0.06,
            radius: 0.25,
            suspensionLen: 0.075,
            backLeftPos: new Vector3(-0.4, -0.23, -0.62),
            backRightPos: new Vector3(0.4, -0.23, -0.62),
            frontRightPos: new Vector3(0.4, -0.23, 0.69),
            frontLeftPos: new Vector3(-0.4, -0.23, 0.69),
        });
   
        requestAnimationFrame(this.Animate);
    }

    InitRenderer(canvas, width, height) {
        this.renderer = new Renderer();
        this.renderer.InitRenderer(canvas, width, height, this.Animate).then(renderer => {
            PostProcessing.init(renderer);
            PostProcessing.addFXAA();
            PostProcessing.addBloom();
            //   PostProcessing.addBokeh(); 
        });
    }

    GetRenderer() {
        return this.renderer.renderer;
    }

    Animate = () => {

        Time.Update();

        Physics.update();
        Scene.update();

        const camPos = Camera.position;// Camera.GetCamera().position;
        this.light.position.set(camPos.x, 1, camPos.z + 5);
        this.light.target.position.set(-5 + camPos.x, -5, -5 + camPos.z);


        if (PostProcessing.isUsingEffects())
            PostProcessing.render();
        else
            this.renderer.Render(Scene.getScene(), Camera.mainCamera);
    }
}

const GameEngine = new Engine();

export default GameEngine;