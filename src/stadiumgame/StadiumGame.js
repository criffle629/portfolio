import Player from './Player';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';
import Vector3 from '../engine/Vector3';
import Vector2 from '../engine/Vector2';
import Physics from '../engine/Physics';
import GameObject from '../engine/GameObject';
import Vehicle from '../engine/Vehicle';
import Quaternion from '../engine/Quaternion';
 
import Light from '../engine/Light';
import Ball from '../engine/Ball';
import VehicleManager from '../engine/VehicleManager';

export default class StadiumGame{
    constructor() {
     
        Scene.setExpoFog('skyblue', 0.001);

        this.ball = new Ball({
            position: new Vector3(0.0, 1.0, -20.0),
            rotation: Quaternion.Identity(),
            mass: 1,
            friction: 0.25,
            rollingFriction: 0.25,
            restitution: 2,
            damping: new Vector2(0.2, 0.1),
            radius: 1,
            model: './assets/models/stadiumball.glb'
        });

        this.light = new Light({
            lightType: Light.LightType.DIRECTIONAL,
            color: 0xffffff,
            intensity: 1,
            castShadow: true,
            shadowMapWidth: 8000,
            shadowMapHeight: 8000,
            cameraNear: 0.1,
            cameraFar: 500,
            shadowBias: -0.00025,
            shadowCameraSize: 50,
            target: new Vector3(-5, -5, -5)
        });

        this.ambientLight = new Light({
            lightType: Light.LightType.AMBIENT,
            color: 0xffffff,
            intensity: 0.5
        });

        this.Load().then(() => { });
    }

    Load = async () => {
        return await new Promise((resolve, reject) => {
            this.player = new Player('player', null, true, true, true, new Vector3(0, 1, 0));
            this.player.LoadModel('player', './assets/models/chris.glb', true)
            .then(() => {
                this.player.addRigidBody({
                    friction: 1,
                    rollingFriction: 0,
                    restitution: 0.0,
                    mass: 1
                }, Physics.createCapsuleShape(0.25, 0.5, Vector3.up), new Vector3(0, 1, 0));
            });
           
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
                                this.soccerfielddome.addRigidBody(
                                    {
                                        friction: 1,
                                        rollingFriction: 1,
                                        restitution: 0.5,
                                        mass: 0
                                    }, shape, new Vector3(0, 0, 0));
                            });
                    });

                  
            Camera.target = this.player;

            this.vehicle2 = new Vehicle({
                breakForce: 25,
                accelForceFront: 150,
                accelForceBack: 150,
                accelRate: 3,
                downForce: 10,
                topSpeed: 180,
                bodyWidth: 1.0,
                bodyHeight: 0.5,
                constantDownforce: true,
                bodyLength: 2.128,
                mass: 100,
                enginePitch: 25,
                position: new Vector3(-3.62, 0.56, -9.23),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/classicbug.glb',
                wheelLeftModel: './assets/models/classicbugwheelLeft.glb',
                wheelRightModel: './assets/models/classicbugwheelRight.glb',
                stiffness: 100.0,
                damping: 5.75,
                compression: 0,
                backFriction: 400,
                frontFriction: 400,
                roll: 0,
                radius: 0.25,
                suspensionLen: 0.1,
                backLeftPos: new Vector3(-0.4, -0.2, -0.654),
                backRightPos: new Vector3(0.4, -0.2, -0.654),
                frontRightPos: new Vector3(0.38, -0.2, 0.719),
                frontLeftPos: new Vector3(-0.38, -0.2, 0.719),
            });

            this.vehicle = new Vehicle({
                breakForce: 25,
                accelForceFront: 0,
                accelForceBack: 150,
                downForce: 0.3,
                accelRate: 3.5,
                topSpeed: 250,
                bodyWidth: 1.25,
                bodyHeight: 0.6,
                bodyLength: 2.128,
                mass: 150,
                enginePitch: -100,
                position: new Vector3(-5, 0.624, -10.447),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/hotrod.glb',
                wheelLeftModel: './assets/models/hotrodwheelLeft.glb',
                wheelRightModel: './assets/models/hotrodwheelRight.glb',
                stiffness: 500.0,
                damping: 1.3,
                compression: 1.4,
                backFriction: 2,
                frontFriction: 2,
                roll: 0.25,
                radius: 0.25,
                suspensionLen: 0.01,
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
                downForce: 0.3,
                topSpeed: 200,
                bodyWidth: 1.15,
                bodyHeight: 0.5,
                bodyLength: 2.128,
                mass: 200,
                enginePitch: -50,
                position: new Vector3(0, 0.59, -9.5),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/sportscar.glb',
                wheelLeftModel: './assets/models/sportscarwheelLeft.glb',
                wheelRightModel: './assets/models/sportscarwheelRight.glb',
                stiffness: 500.0,
                damping: 2.3,
                compression: 2,
                backFriction: 2,
                frontFriction: 2,
                roll: 0.25,
                radius: 0.25,
                suspensionLen: 0.01,
                backLeftPos: new Vector3(-0.45, -0.23, -0.62),
                backRightPos: new Vector3(0.45, -0.23, -0.62),
                frontRightPos: new Vector3(0.45, -0.23, 0.69),
                frontLeftPos: new Vector3(-0.45, -0.23, 0.69),
            });

            this.vehicle4 = new Vehicle({
                breakForce: 35,
                accelForceFront: 0,
                accelForceBack: 500,
                accelRate: 1,
                downForce: 0.3,
                topSpeed: 322,
                bodyWidth: 1.15,
                bodyHeight: 0.35,
                bodyLength: 2.128,
                mass: 100,
                enginePitch: 50,
                position: new Vector3(-6.883, 0.295, -6.466),
                rotation: new Quaternion(0, 0.545, 0, 0.8383),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/racecar.glb',
                wheelLeftModel: './assets/models/racecarwheelLeft.glb',
                wheelRightModel: './assets/models/racecarwheelRight.glb',
                stiffness: 500.0,
                damping: 2.3,
                compression: 2.4,
                backFriction: 2,
                frontFriction:2,
                roll: 0.0,
                radius: 0.25,
                suspensionLen: 0.01,
                backLeftPos: new Vector3(-0.4, 0, -0.8),
                backRightPos: new Vector3(0.4, 0, -0.8),
                frontRightPos: new Vector3(0.4, 0, 0.67),
                frontLeftPos: new Vector3(-0.4, 0, 0.67),
            });

            this.vehicle5 = new Vehicle({
                breakForce: 10,
                accelForceFront: 0,
                accelForceBack: 650,
                accelRate: 1,
                downForce: 0.3,
                topSpeed: 100,
                bodyWidth: 1.0,
                bodyHeight: 1.5,
                bodyLength: 2.128,
                mass: 500,
                enginePitch: -100,
                position: new Vector3(-7.75, 0.649, -10.43),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/truck.glb',
                wheelLeftModel: './assets/models/truckwheelLeft.glb',
                wheelRightModel: './assets/models/truckwheelRight.glb',
                stiffness: 500.0,
                damping: 2.3,
                compression: 1.4,
                backFriction: 2,
                frontFriction: 2,
                roll: .25,
                radius: 0.25,
                suspensionLen: 0.01,
                backLeftPos: new Vector3(-0.45, -0.5, -0.6),
                backRightPos: new Vector3(0.45, -0.5, -0.6),
                frontRightPos: new Vector3(0.45, -0.5, 0.95),
                frontLeftPos: new Vector3(-0.45, -0.5, 0.95),
            });

            this.vehicle5 = new Vehicle({
                breakForce: 20,
                accelForceFront: 0,
                accelForceBack: 225,
                accelRate: 3,
                downForce: 0.3,
                topSpeed: 160,
                bodyWidth: 1.0,
                bodyHeight: 1.0,
                bodyLength: 2.128,
                mass: 300,
                enginePitch: -100,
                position: new Vector3(-8.404, 0.649, -8.43),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/pickup.glb',
                wheelLeftModel: './assets/models/pickupwheelLeft.glb',
                wheelRightModel: './assets/models/pickupwheelRight.glb',
                stiffness: 500.0,
                damping: 2.3,
                compression: 1.4,
                backFriction: 2,
                frontFriction: 2,
                roll: .25,
                radius: 0.25,
                suspensionLen: 0.01,
                backLeftPos: new Vector3(-0.425, -0.3, -0.79),
                backRightPos: new Vector3(0.425, -0.3, -0.79),
                frontRightPos: new Vector3(0.425, -0.3, 0.71),
                frontLeftPos: new Vector3(-0.425, -0.3, 0.71),
            });
            resolve(true);  // This needs to be better
        });
    }

    update(){
        VehicleManager.checkVehicleInRange(this.player.position);
    }
}