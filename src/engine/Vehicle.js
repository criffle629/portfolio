import Scene from './Scene';
import Physics from './Physics';
import GameObject from './GameObject';
import Quaternion from './Quaternion';
import Vector3 from './Vector3';
import Input from './Input';
import Time from './Time';
import MathTools from './MathTools';
import Camera from './Camera';
import Audio from './Audio';
import Content from './Content';
import Ammo from 'ammo.js';
import VehicleManager from './VehicleManager';

export default class Vehicle extends GameObject {
    constructor(options) {
        super();

        this.inUse = false;
        this.castShadow = true;
        this.recieveShadow = true;
        this.skinnedMesh = false;

        this.topSpeed = options.topSpeed;
        this.steeringRate = 5.0;
        this.accelRate = options.accelRate;
        this.breakForce = options.breakForce;
        this.accelForceFront = options.accelForceFront;
        this.accelForceBack = options.accelForceBack;
        this.reverse = false;
        this.engineSound = null;
    
        Audio.LoadSound('./assets/sounds/engine.wav', true, 0.25)
            .then(sound => {
                this.engineSound = sound;
                this.engineSound.play();
                Content.LoadMesh(options.bodyModel, options.bodyModel, false, true, true, false)
                .then(model => {
                    this.model = model;
                    
                    this.setPosition(this.position);
                    this.setRotation(this.rotation);
               
                 })
                .catch(e => {
                    console.log(e);
                });
              
            })
            .catch(e => {
                console.log(e)
            });

        this.bodyShape = Physics.createBoxShape(new Vector3(options.bodyWidth, options.bodyHeight, options.bodyLength));

        var transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(options.position.x, options.position.y, options.position.z));
        transform.setRotation(new Ammo.btQuaternion(options.rotation.x, options.rotation.y, options.rotation.z, options.rotation.w));
        var motionState = new Ammo.btDefaultMotionState(transform);
        var localInertia = new Ammo.btVector3(0, 0, 0);
        this.bodyShape.calculateLocalInertia(options.mass, localInertia);
        this.body = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(options.mass, motionState, this.bodyShape, localInertia));
        this.body.setActivationState(4);

        Physics.world.addRigidBody(this.body);
        this.tuning = new Ammo.btVehicleTuning();

        this.raycaster = new Ammo.btDefaultVehicleRaycaster(Physics.world);
        this.vehicle = new Ammo.btRaycastVehicle(this.tuning, this.body, this.raycaster);

        this.vehicle.setCoordinateSystem(0, 1, 2);

        Physics.world.addAction(this.vehicle);
        Scene.addGameObject(this);

     
        this.wheelModels = [];
        this.wheelModels.push(new GameObject(options.wheelLeftModel, options.wheelLeftModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelRightModel, options.wheelRightModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelRightModel, options.wheelRightModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelLeftModel, options.wheelLeftModel, false, true, true));

        for (let i = 0; i < this.wheelModels.length; i++) {
            this.wheelModels[i].allowUpdate = false;
        }

        this.wheelInfo = [];
        this.wheelInfo.push(this.createWheel(options, true, options.frontLeftPos, new Vector3(0, -1, 0), new Vector3(-1, 0, 0)));
        this.wheelInfo.push(this.createWheel(options, true, options.frontRightPos, new Vector3(0, -1, 0), new Vector3(-1, 0, 0)));
        this.wheelInfo.push(this.createWheel(options, false, options.backRightPos, new Vector3(0, -1, 0), new Vector3(-1, 0, 0)));
        this.wheelInfo.push(this.createWheel(options, false, options.backLeftPos, new Vector3(0, -1, 0), new Vector3(-1, 0, 0)));

        this.tuning = new Ammo.btVehicleTuning();
        this.currentAccelFront = 0;
        this.currentAccelBack = 0;
        this.currentBraking = 0;
        this.steeringAngle = 0;
        this.speed = 0;

        VehicleManager.addVehicle(this);
    }

    createWheel(options, front, wheelPos, wheelDir, wheelAxle) {

        let wheel = this.vehicle.addWheel(wheelPos.to_btVector3(), wheelDir.to_btVector3(), wheelAxle.to_btVector3(), options.suspensionLen, options.radius, this.tuning, front);

        wheel.set_m_suspensionStiffness(options.stiffness);
        wheel.set_m_wheelsDampingRelaxation(options.damping);
        wheel.set_m_wheelsDampingCompression(options.compression);

        const friction = front ? options.frontFriction : options.backFriction;
        wheel.set_m_frictionSlip(friction);
        wheel.set_m_rollInfluence(options.roll);

        return wheel;
    }

    updateInput() {

        if (!this.inUse) return;

        this.reverse = false;
        if (Input.isKeyDown('w') && this.speed <= this.topSpeed){
        
                this.currentBraking = 0;
                this.currentAccelBack =  this.accelForceBack * this.accelRate;
                this.currentAccelFront = this.accelForceFront * this.accelRate;
        }
        else
        {
            this.currentAccelBack = 0;
            this.currentAccelFront = 0;
            this.currentBraking = 0.5;
        }
 
        if (Input.isKeyDown('s'))
        {
            this.reverse = true;
            if (this.speed <= 0 )
                {
                    this.currentBraking = 0;
                    this.currentAccelBack =  -((this.accelForceBack * 0.5) * this.accelRate);
                    this.currentAccelFront = -((this.accelForceFront * 0.5) * this.accelRate);
                }
                else
                this.currentBraking = this.breakForce * 0.25;
        }
        
        if (Input.isKeyDown('a')) {
            this.steeringAngle += 15 * this.steeringRate * Time.deltaTime;
        }
        else
            if (Input.isKeyDown('d')) {
                this.steeringAngle -= 15 * this.steeringRate * Time.deltaTime;
            }
            else {
                this.steeringAngle = MathTools.moveTowards(this.steeringAngle, 0.0, this.steeringRate * Time.deltaTime);
            }
        this.steeringAngle = MathTools.clamp(this.steeringAngle, -25, 25);
    }

    update() {
        Camera.mainCamera.add(Audio.listener);
 
        this.updateInput();

        if (!this.inUse){
            this.currentBraking = this.breakForce * 0.25;;
            this.currentAccelBack =  0;
            this.currentAccelFront = 0;
        }
        this.vehicle.applyEngineForce(this.currentAccelFront, 0);
        this.vehicle.applyEngineForce(this.currentAccelFront, 1);
        this.vehicle.applyEngineForce(this.currentAccelBack, 2);
        this.vehicle.applyEngineForce(this.currentAccelBack, 3);

        this.vehicle.setBrake(this.currentBraking, 0);
        this.vehicle.setBrake(this.currentBraking, 1);
        this.vehicle.setBrake(this.currentBraking / 2, 2);
        this.vehicle.setBrake(this.currentBraking / 2, 3);
        this.vehicle.setSteeringValue(0, 3);
        this.vehicle.setSteeringValue(0, 2);
        this.vehicle.setSteeringValue(this.steeringAngle * MathTools.deg2Rad, 0);
        this.vehicle.setSteeringValue(this.steeringAngle * MathTools.deg2Rad, 1);

        let tm, p, q;
        for (let i = 0; i < this.vehicle.getNumWheels(); i++) {

            this.vehicle.updateWheelTransform(i, false);
            tm = this.vehicle.getWheelTransformWS(i);
            p = tm.getOrigin();
            q = tm.getRotation();
            if (this.wheelModels[i].model && this.wheelModels[i].model.mesh) {
                this.wheelModels[i].model.mesh.position.set(p.x(), p.y(), p.z());
                this.wheelModels[i].model.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
            }
        }

        tm = this.body.getWorldTransform();
        p = tm.getOrigin();
        q = tm.getRotation();

        if (this.model && this.model.mesh) {
            this.model.mesh.position.set(p.x(), p.y(), p.z());
            this.model.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());

            this.position = new Vector3(p.x(), p.y(), p.z());
            this.rotation = new Quaternion(q.x(), q.y(), q.z(), q.w());
        }

        let vel = (this.vehicle.getRigidBody().getLinearVelocity().length() - 0.163);
        if (vel < 0.009)
            vel = 0;
        const dir = this.reverse && this.speed < 0.05 ? -1 : 1;
        this.speed = vel * 9.8 * dir;
        
        if (this.engineSound !== null && this.model !== null){
            this.engineSound.setDetune(this.speed * 10);
            this.engineSound.panner.positionX.value = this.model.mesh.position.x;
            this.engineSound.panner.positionY.value = this.model.mesh.position.y;
            this.engineSound.panner.positionZ.value = this.model.mesh.position.z;
            
        }
    }
}
