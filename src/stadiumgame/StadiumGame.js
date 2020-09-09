import Scene from '../engine/Scene';
import Camera from '../engine/Camera';
import Vector3 from '../engine/Vector3';
import Vector2 from '../engine/Vector2';
import Physics from '../engine/Physics';
import GameObject from '../engine/GameObject';
import Vehicle from './Vehicle';
import Quaternion from '../engine/Quaternion';
import Light from '../engine/Light';
import Ball from '../engine/Ball';
import VehicleManager from '../engine/VehicleManager';
import CameraController from './CameraController';
import Multiplayer from './Multiplayer';
import GameEngine from '../engine/GameEngine';

export default class StadiumGame{
 
    Init(){

       
        Scene.setExpoFog('skyblue', 0.001);

        this.ball = new Ball({
            position: new Vector3(0.0, 1.0, -20.0),
            rotation: Quaternion.Identity(),
            mass: 1,
            friction: 0.25,
            rollingFriction: 0.5,
            restitution: 1.75,
            damping: new Vector2(0.1, 0.1),
            radius: 1.5,
            model: './assets/models/stadiumball.glb'
        });

        this.light = new Light({
            lightType: Light.LightType.DIRECTIONAL,
            color: 0xffffff,
            intensity: 0.5,
            castShadow: true,
            shadowMapWidth: 8000,
            shadowMapHeight: 8000,
            cameraNear: 0.1,
            cameraFar: 500,
            shadowBias: -0.00025,
            shadowCameraSize: 50,
            target: new Vector3(0, -1, 0)
        });

        this.ambientLight = new Light({
            lightType: Light.LightType.AMBIENT,
            color: 0xffffff,
            intensity: 0.5
        });
        GameEngine.openModal('stadiummenu');
        this.Load().then(() => { });
    }

    Load = async () => {
        return await new Promise((resolve, reject) => {
 
            this.soccerfield = new GameObject('ground', null    , false, false, true,);
            this.soccerfield.addRigidBody({
                friction: 1,
                rollingFriction: 1,
                restitution: 0.5,
                mass: 0
            }, Physics.createPlaneShape(Vector3.up), new Vector3(0, 0.0, 0));
            
                this.soccerfielddome = new GameObject('soccerfielddome', null, false, false, true, true);
                this.soccerfielddome.LoadModel('soccerfielddome', './assets/models/soccerfielddome.glb', false)
                    .then(() => {
                        Physics.createMeshShape(this.soccerfielddome.model.mesh)
                            .then(shape => {
                                Camera.Configure(60, Scene.aspectRatio, 0.1, 1000.0);
                                this.soccerfielddome.addRigidBody(
                                    {
                                        friction: 0.25,
                                        rollingFriction: 0.25,
                                        restitution: 0.5,
                                        mass: 0
                                    }, shape, new Vector3(0, 0, 0));
                            });
                    });

                  
            Camera.target = this.player;
            Camera.controller = new CameraController( new Vector3(0, 3.0, 5.0), this.ball);

            this.vehicle2 = new Vehicle({
                breakForce: 25,
                accelForceFront: 100,
                accelForceBack: 100,
                accelRate: 3,
                downForce: -0.35,
                topSpeed: 150,
                bodyWidth: 0.956,
                bodyHeight: 0.738,
                bodyLength: 2.28,
                mass: 100,
                enginePitch: 25,
                position: new Vector3(0.62, 0.56, -9.23),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/classicbug.glb',
                wheelLeftModel: './assets/models/classicbugwheelLeft.glb',
                wheelRightModel: './assets/models/classicbugwheelRight.glb',
                stiffness: 250.0,
                damping: 15,
                compression: 2.4,
                backFriction: 1,
                frontFriction: 1,
                roll: 0.02,
                radius: 0.25,
                suspensionLen: 0.05,
                backLeftPos: new Vector3(-0.4, -0.35, -0.654),
                backRightPos: new Vector3(0.4, -0.35, -0.654),
                frontRightPos: new Vector3(0.38, -0.35, 0.719),
                frontLeftPos: new Vector3(-0.38, -0.35, 0.719),
            });
            VehicleManager.controllVehicle(this.vehicle2);
           
            resolve(true);  // This needs to be better
        });
    }

    update(){
       
    }
}