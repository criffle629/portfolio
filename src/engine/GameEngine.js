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
import VehicleManager from './VehicleManager';

class Engine {
    constructor() {

        this.fps = 0;
        this.fpsTime = 0;

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

        this.light.target = new THREE.Object3D();

        Scene.setExpoFog('skyblue', 0.025);
        Scene.add(this.light.target);
        Scene.add(this.light);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        Scene.add(this.ambientLight);

        this.player = new Player('player', './assets/models/chris.glb', true, true, true);
        this.player.addRigidBody(1, Physics.createCapsuleShape(0.25, 0.5, Vector3.up), new Vector3(0, 10, 0));
    
        this.ground = new GameObject('ground', './assets/models/ground.glb', false, false, true,);
        this.ground.addRigidBody(0, Physics.createPlaneShape(Vector3.up), new Vector3(0, 0.0, 0));
    
        this.grass = new GameObject('grass', './assets/models/grass.glb', false, true, true, true,  new Vector3(0, 0, -10));
    
        this.moundSign = new GameObject('moundsign', './assets/models/moundsign.glb', false, true, true,);
        this.moundSign.setPosition(new Vector3(0, 0, -10));

        this.road = new GameObject('road', null, false, true, true, true);
        this.road.LoadModel('road', './assets/models/road.glb', true)
            .then(() => {
                Physics.createMeshShape(this.road.model.mesh)
                    .then(shape => {
                        this.road.addRigidBody(0, shape, new Vector3(0, 0, -10));
                    });
            });

        this.garage = new GameObject('garage', null, false, true, true, true);
        this.garage.LoadModel('garage', './assets/models/garage.glb', true)
            .then(() => {
                Physics.createMeshShape(this.garage.model.mesh)
                    .then(shape => {
                        this.garage.addRigidBody(0, shape, new Vector3(0, 0, -10));
                    });
            });

        this.garagedoor = new GameObject('garagedoor', null, false, true, true, true);
        this.garagedoor.LoadModel('garagedoor', './assets/models/garagedoor.glb', true)
            .then(() => {
                Physics.createMeshShape(this.garagedoor.model.mesh)
                    .then(shape => {
                        this.garagedoor.addRigidBody(0, shape, new Vector3(0, 0, -10));
                    });
            });

        this.rrsign = new GameObject('rrsign', null, false, true, true, true);
        this.rrsign.LoadModel('rrsign', './assets/models/rrsign.glb', true)
            .then(() => {
                Physics.createMeshShape(this.rrsign.model.mesh)
                    .then(shape => {
                        this.rrsign.addRigidBody(0, shape, new Vector3(0, 0, -10));
                    });
            });

        this.mound = new GameObject('mound', null, false, true, true, true);
        this.mound.LoadModel('mound', './assets/models/mound.glb', true)
            .then(() => {
                Physics.createMeshShape(this.mound.model.mesh)
                    .then(shape => {
                        this.mound.addRigidBody(0, shape, new Vector3(0, 0, -10));
                    });
            });

        this.fenceleft = new GameObject('fenceleft', null, false, true, true, true);
        this.fenceleft.LoadModel('fenceleft', './assets/models/fenceleft.glb', true)
            .then(() => {
                Physics.createMeshShape(this.fenceleft.model.mesh)
                    .then(shape => {
                        this.fenceleft.addRigidBody(0, shape, new Vector3(0, 0, -10));
                    });
            });

        Camera.target = this.player;
  
        this.vehicle2 = new Vehicle({
            breakForce: 10,
            accelForceFront: 0,
            accelForceBack: 50,
            accelRate: 2,
            downForce: 0,
            topSpeed: 100,
            bodyWidth: 1.0,
            bodyHeight: 0.5,
            bodyLength: 2.128,
            mass: 75,
            enginePitch: 25,
            position: new Vector3(-23.75, 1.5, -10),
            rotation: Quaternion.FromEuler(0, 12, 0),
            centerOfMass: new Vector3(0, -1, 0),
            bodyModel: './assets/models/classicbug.glb',
            wheelLeftModel: './assets/models/classicbugwheelLeft.glb',
            wheelRightModel: './assets/models/classicbugwheelRight.glb',
            wheelModel: './assets/models/.glb',
            stiffness: 250.0,
            damping: 2.3,
            compression: 1.4,
            backFriction: 0.95,
            frontFriction: 0.95,
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
            accelForceBack: 100,
            downForce: 0.0,
            accelRate: 3,
            topSpeed: 160,
            bodyWidth: 1.25,
            bodyHeight: 0.5,
            bodyLength: 2.128,
            mass: 300,
            enginePitch: -100,
            position: new Vector3(-25.75, 1.5, -9),
            rotation: Quaternion.FromEuler(0, 12, 0),
            centerOfMass: new Vector3(0, -1, 0),
            bodyModel: './assets/models/hotrod.glb',
            wheelLeftModel: './assets/models/hotrodwheelLeft.glb',
            wheelRightModel: './assets/models/hotrodwheelRight.glb',
            stiffness: 50.0,
            damping: 2.3,
            compression: 2.4,
            backFriction: 2,
            frontFriction: 2,
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
            accelForceFront: 180,
            accelForceBack: 250,
            accelRate: 1,
            downForce: 0.25,
            topSpeed: 200,
            bodyWidth: 1.15,
            bodyHeight: 0.5,
            bodyLength: 2.128,
            mass: 200,
            enginePitch: -50,
            position: new Vector3(-26.75, 1.5, -9),
            rotation: Quaternion.FromEuler(0, 12, 0),
            centerOfMass: new Vector3(0, -1, 0),
            bodyModel: './assets/models/sportscar.glb',
            wheelLeftModel: './assets/models/sportscarwheelLeft.glb',
            wheelRightModel: './assets/models/sportscarwheelRight.glb',
            stiffness: 100.0,
            damping: 2.3,
            compression: 2.4,
            backFriction: .85,
            frontFriction: .95,
            roll: 0.25,
            radius: 0.25,
            suspensionLen: 0.095,
            backLeftPos: new Vector3(-0.45, -0.23, -0.62),
            backRightPos: new Vector3(0.45, -0.23, -0.62),
            frontRightPos: new Vector3(0.45, -0.23, 0.69),
            frontLeftPos: new Vector3(-0.45, -0.23, 0.69),
        });

        this.vehicle4 = new Vehicle({
            breakForce: 25,
            accelForceFront: 0,
            accelForceBack: 500,
            accelRate: 1,
            downForce: 0.15,
            topSpeed: 250,
            bodyWidth: 1.15,
            bodyHeight: 0.25,
            bodyLength: 2.128,
            mass: 100,
            enginePitch: 50,
            position: new Vector3(-28.75, 1.5, -7),
            rotation: Quaternion.FromEuler(0, 12, 0),
            centerOfMass: new Vector3(0, -1, 0),
            bodyModel: './assets/models/racecar.glb',
            wheelLeftModel: './assets/models/racecarwheelLeft.glb',
            wheelRightModel: './assets/models/racecarwheelRight.glb',
            stiffness: 500.0,
            damping: 2.3,
            compression: 2.4,
            backFriction: 5,
            frontFriction: 5,
            roll: 0.0,
            radius: 0.25,
            suspensionLen: 0.01,
            backLeftPos: new Vector3(-0.4, 0, -0.8),
            backRightPos: new Vector3(0.4, 0, -0.8),
            frontRightPos: new Vector3(0.4, 0, 0.67),
            frontLeftPos: new Vector3(-0.4, 0, 0.67),
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
        VehicleManager.checkVehicleInRange(this.player.position);
        Scene.update();

        const camPos = Camera.position;// Camera.GetCamera().position;
        this.light.position.set(camPos.x, 1, camPos.z + 5);
        this.light.target.position.set(-5 + camPos.x, -5, -5 + camPos.z);

        //   if (PostProcessing.isUsingEffects())
        //      PostProcessing.render();
        // else
        this.renderer.Render(Scene.getScene(), Camera.mainCamera);

        this.fpsTime += Time.deltaTime;
        this.fps++;
        if (this.fpsTime >= 1){
            document.title = this.fps + ' fps';
            this.fps = 0;
            this.fpsTime = 0;
        }
    }
}

const GameEngine = new Engine();

export default GameEngine;