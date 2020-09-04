import Player from './Player';
import Scene from './Scene';
import Camera from './Camera';
import Vector3 from './Vector3';
import Vector2 from './Vector2';
import Physics from './Physics';
import GameObject from './GameObject';
import Vehicle from './Vehicle';
import Quaternion from './Quaternion';
import InfoStationManager from './InfoStationManager';
import Light from './Light';
import Ball from './Ball';
import VehicleManager from './VehicleManager';

export default class MainGame{
    constructor() {
     
        this.ball = new Ball({
            position: new Vector3(0.0, 2.0, -20.0),
            rotation: Quaternion.Identity(),
            mass: 0.2,
            friction: 0.5,
            rollingFriction: 0.3,
            restitution: 3,
            damping: new Vector2(0.2, 0.1),
            radius: 0.125,
            model: './assets/models/soccerball.glb'
        });

        Scene.setExpoFog('skyblue', 0.01);

        this.light = new Light({
            lightType: Light.LightType.DIRECTIONAL,
            color: 0xffffff,
            intensity: 1,
            castShadow: true,
            shadowMapWidth: 8192,
            shadowMapHeight: 8192,
            cameraNear: 0.1,
            cameraFar: 500,
            shadowBias: -0.00025,
            shadowCameraSize: 100,
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

            this.ground = new GameObject('ground', './assets/models/ground.glb', false, false, true,);
            this.ground.addRigidBody({
                friction: 1,
                rollingFriction: 1,
                restitution: 0.2    ,
                mass: 0
            }, Physics.createPlaneShape(Vector3.up), new Vector3(0, 0.0, 0));

            this.grass = new GameObject('grass', './assets/models/grass.glb', false, true, true, true, new Vector3(0, 0, -10));

            this.moundSign = new GameObject('moundsign', './assets/models/moundsign.glb', false, true, true,);
            this.moundSign.setPosition(new Vector3(0, 0, -10));

            this.road = new GameObject('road', null, false, true, true, true);
            this.road.LoadModel('road', './assets/models/road.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.road.model.mesh)
                        .then(shape => {
                            this.road.addRigidBody(
                                {
                                    friction: 1,
                                    rollingFriction: 1,
                                    restitution: 0.0,
                                    mass: 0
                                }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.parkinglot = new GameObject('parkinglot', null, false, true, true, true);
            this.parkinglot.LoadModel('parkinglot', './assets/models/parkinglot.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.parkinglot.model.mesh)
                        .then(shape => {
                            this.parkinglot.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.infostation = new GameObject('infostation', './assets/models/infostation.glb', false, false, true, false, new Vector3(0, 0, -10));

            this.infostationbase = new GameObject('infostationbase', null, false, false, true, false, new Vector3(0, 0, -10));
            this.infostationbase.LoadModel('infostation', './assets/models/infostationbase.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.infostationbase.model.mesh)
                        .then(shape => {
                            this.infostationbase.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.mightychicken = new GameObject('mightychicken', null, false, true, true, true);


            this.mightychicken.LoadModel('mightychicken', './assets/models/mightychicken.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.mightychicken.model.mesh)
                        .then(shape => {
                            this.mightychicken.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.mightychickensign = new GameObject('mightychickensign', null, false, true, true, true);


            this.mightychickensign.LoadModel('mightychickensign', './assets/models/mightychickensign.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.mightychickensign.model.mesh)
                        .then(shape => {
                            this.mightychickensign.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

                this.mightychickensignpost = new GameObject('mightychickensignpost', null, false, true, true, true);


                this.mightychickensignpost.LoadModel('mightychickensignpost', './assets/models/mightychickensignpost.glb', true)
                    .then(() => {
                        Physics.createMeshShape(this.mightychickensignpost.model.mesh)
                            .then(shape => {
                                this.mightychickensignpost.addRigidBody({
                                    friction: 1,
                                    rollingFriction: 1,
                                    restitution: 0.0,
                                    mass: 0
                                }, shape, new Vector3(0, 0, -10));
                            });
                    });

            InfoStationManager.addInfoStation(new Vector3(-19.921, 0, -7.5799), 'roadracer');
            InfoStationManager.addInfoStation(new Vector3(-41.183, 0, -0.5502), 'mightychicken');

            this.parkinglotcurb = new GameObject('parkinglotcurb', null, false, true, true, true);
            this.parkinglotcurb.LoadModel('parkinglotcurb', './assets/models/parkinglotcurb.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.parkinglotcurb.model.mesh)
                        .then(shape => {
                            this.parkinglotcurb.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.garage = new GameObject('garage', null, false, true, true, true);
            this.garage.LoadModel('garage', './assets/models/garage.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.garage.model.mesh)
                        .then(shape => {
                            this.garage.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.garagedoor = new GameObject('garagedoor', null, false, true, true, true);
            this.garagedoor.LoadModel('garagedoor', './assets/models/garagedoor.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.garagedoor.model.mesh)
                        .then(shape => {
                            this.garagedoor.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.rrsign = new GameObject('rrsign', null, false, true, true, true);
            this.rrsign.LoadModel('rrsign', './assets/models/rrsign.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.rrsign.model.mesh)
                        .then(shape => {
                            this.rrsign.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.mound = new GameObject('mound', null, false, true, true, true);
            this.mound.LoadModel('mound', './assets/models/mound.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.mound.model.mesh)
                        .then(shape => {
                            this.mound.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

            this.fenceleft = new GameObject('fenceleft', null, false, true, true, true);
            this.fenceleft.LoadModel('fenceleft', './assets/models/fenceleft.glb', true)
                .then(() => {
                    Physics.createMeshShape(this.fenceleft.model.mesh)
                        .then(shape => {
                            this.fenceleft.addRigidBody({
                                friction: 1,
                                rollingFriction: 1,
                                restitution: 0.0,
                                mass: 0
                            }, shape, new Vector3(0, 0, -10));
                        });
                });

   
            Camera.target = this.player;

            this.vehicle2 = new Vehicle({
                breakForce: 25,
                accelForceFront: 20,
                accelForceBack: 100,
                accelRate: 3,
                downForce: 0.02,
                topSpeed: 120,
                bodyWidth: 1.0,
                bodyHeight: 0.5,
                bodyLength: 2.128,
                mass: 100,
                enginePitch: 25,
                position: new Vector3(-38.62, 0.56, -9.23),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/classicbug.glb',
                wheelLeftModel: './assets/models/classicbugwheelLeft.glb',
                wheelRightModel: './assets/models/classicbugwheelRight.glb',
                stiffness: 50.0,
                damping: 1.75,
                compression: 2.4,
                backFriction: 0.95,
                frontFriction: 1,
                roll: .25,
                radius: 0.25,
                suspensionLen: 0.095,
                backLeftPos: new Vector3(-0.4, -0.2, -0.654),
                backRightPos: new Vector3(0.4, -0.2, -0.654),
                frontRightPos: new Vector3(0.38, -0.2, 0.719),
                frontLeftPos: new Vector3(-0.38, -0.2, 0.719),
            });

            this.vehicle = new Vehicle({
                breakForce: 25,
                accelForceFront: 0,
                accelForceBack: 150,
                downForce: 0.01,
                accelRate: 3.5,
                topSpeed: 250,
                bodyWidth: 1.25,
                bodyHeight: 0.6,
                bodyLength: 2.128,
                mass: 150,
                enginePitch: -100,
                position: new Vector3(-24.438, 0.624, -10.447),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/hotrod.glb',
                wheelLeftModel: './assets/models/hotrodwheelLeft.glb',
                wheelRightModel: './assets/models/hotrodwheelRight.glb',
                stiffness: 50.0,
                damping: 1.3,
                compression: 1.4,
                backFriction: 2,
                frontFriction: 2,
                roll: 0.25,
                radius: 0.25,
                suspensionLen: 0.095,
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
                position: new Vector3(-27.407, 0.59, -9.5),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/sportscar.glb',
                wheelLeftModel: './assets/models/sportscarwheelLeft.glb',
                wheelRightModel: './assets/models/sportscarwheelRight.glb',
                stiffness: 150.0,
                damping: 2.3,
                compression: 2,
                backFriction: 1.8   ,
                frontFriction: 2,
                roll: 0.25,
                radius: 0.25,
                suspensionLen: 0.075,
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
                downForce: 0.15,
                topSpeed: 322,
                bodyWidth: 1.15,
                bodyHeight: 0.35,
                bodyLength: 2.128,
                mass: 100,
                enginePitch: 50,
                position: new Vector3(-35.883, 0.295, -6.466),
                rotation: new Quaternion(0, 0.545, 0, 0.8383),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/racecar.glb',
                wheelLeftModel: './assets/models/racecarwheelLeft.glb',
                wheelRightModel: './assets/models/racecarwheelRight.glb',
                stiffness: 500.0,
                damping: 2.3,
                compression: 2.4,
                backFriction: 0.95,
                frontFriction:1,
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
                accelForceBack: 250,
                accelRate: 1,
                downForce: 0.01,
                topSpeed: 100,
                bodyWidth: 1.0,
                bodyHeight: 1.5,
                bodyLength: 2.128,
                mass: 500,
                enginePitch: -100,
                position: new Vector3(-33.75, 0.649, -10.43),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/truck.glb',
                wheelLeftModel: './assets/models/truckwheelLeft.glb',
                wheelRightModel: './assets/models/truckwheelRight.glb',
                stiffness: 250.0,
                damping: 2.3,
                compression: 1.4,
                backFriction: 0.95,
                frontFriction: 0.95,
                roll: .25,
                radius: 0.25,
                suspensionLen: 0.1,
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
                downForce: 0.2,
                topSpeed: 160,
                bodyWidth: 1.0,
                bodyHeight: 1.0,
                bodyLength: 2.128,
                mass: 300,
                enginePitch: -100,
                position: new Vector3(-30.404, 0.649, -8.43),
                rotation: new Quaternion(0, 0.191, 0, 0.982),
                centerOfMass: new Vector3(0, -1, 0),
                bodyModel: './assets/models/pickup.glb',
                wheelLeftModel: './assets/models/pickupwheelLeft.glb',
                wheelRightModel: './assets/models/pickupwheelRight.glb',
                stiffness: 50.0,
                damping: 2.3,
                compression: 1.4,
                backFriction: 0.95,
                frontFriction: 0.95,
                roll: .25,
                radius: 0.25,
                suspensionLen: 0.125,
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
        InfoStationManager.update(this.player.position);
    }
}