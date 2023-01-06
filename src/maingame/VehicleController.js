import Scene from '../engine/Scene';
import Physics from '../engine/Physics';
import GameObject from '../engine/GameObject';
import Quaternion from '../engine/Quaternion';
import Vector3 from '../engine/Vector3';
import Input from '../engine/Input';
import Time from '../engine/Time';
import MathTools from '../engine/MathTools';
import Camera from '../engine/Camera';
import Audio from '../engine/Audio';
import Content from '../engine/Content';
import Ammo from 'ammo.js';
import Vehicle from '../engine/Vehicle';
import Gamepad from '../engine/Gamepad';
import Vector2 from '../engine/Vector2';
import Multiplayer from './Multiplayer';

export default class VehicleController extends GameObject {
    constructor(options) {
        super();
        this.name = options.name;
        this.inUse = false;
        this.castShadow = true;
        this.recieveShadow = true;
        this.skinnedMesh = false;
        this.lastPosition = new Vector3(options.position.x, options.position.y, options.position.z);
        this.btPos = new Ammo.btVector3(0, 0, 0);
        this.btQuat = new Ammo.btQuaternion(0, 0, 0, 1);
        this.btDownForce = new Ammo.btVector3(0, 0, 0);
        this.topSpeed = options.topSpeed;
        this.steeringRate = 7;
        this.accelRate = options.accelRate;
        this.breakForce = options.breakForce;
        this.accelForceFront = options.accelForceFront;
        this.accelForceBack = options.accelForceBack;
        this.reverse = false;
        this.engineSound = null;
        this.tireSquealSound = null;
        this.enginePitch = options.enginePitch;
        this.centerOfMass = options.centerOfMass;
        this.downForce = options.downForce;
        this.options = options;
        this.speed = 0;
        this.constantDownforce = options.constantDownforce;
        this.downForceVel = new Vector3(0, -(Math.abs(this.speed) * this.downForce), 0);
        this.playerControlled = false;
        this.netContinuedUpdateTrigger = 2.0;
        this.netContinuedUpdateTimer = this.netContinuedUpdateTrigger;
        this.inNetUse = false;
        this.netUpdateTimer = 0.0;

        Audio.LoadSound('./assets/sounds/engine.wav', true, 0.1)
            .then(sound => {
                this.engineSound = sound;
                Content.LoadMesh(options.bodyModel, options.bodyModel, false, true, true, false)
                    .then(model => {
                        this.model = model;
                        this.engineSound.parrent = this.model;
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

        Audio.LoadSound('./assets/sounds/tiresqueal.wav', true, 0.5)
            .then(sound => {
                this.tireSquealSound = sound;
            })
            .catch(e => {
                console.log(e)
            });

        this.bodyShape = Physics.createBoxShape(new Vector3(options.bodyWidth, options.bodyHeight, options.bodyLength));

        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(options.position.x, options.position.y, options.position.z));
        transform.setRotation(new Ammo.btQuaternion(options.rotation.x, options.rotation.y, options.rotation.z, options.rotation.w));
        
        let motionState = new Ammo.btDefaultMotionState(transform);
        let localInertia = new Ammo.btVector3(0, 0, 0);
       
        this.bodyShape.calculateLocalInertia(options.mass, localInertia);
       
        this.body = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(options.mass, motionState, this.bodyShape, localInertia));
        this.body.setActivationState(4);
        this.body.setRestitution(0.5);
       
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
        this.currentBrakingFront = 0;
        this.currentBrakingBack = 0;
        this.steeringAngle = 0;

        Vehicle.addVehicle(this);
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

    isUpsideDown() {
        const rot = this.rotation.Euler();

        return (Math.abs(rot.x) * MathTools.rad2Deg >= 40 || Math.abs(rot.z) * MathTools.rad2Deg >= 40);
    }

    updateInput() {
        if (this.isUpsideDown() && this.inUse && !this.inNetUse) {
            if (Input.isKeyDown('r') || Gamepad.isButtonPressed(Gamepad.Buttons.BUMPER_RIGHT)) {
                const position = new Vector3(this.position.x, this.position.y + 1.5, this.position.z);
                const rotation = new Quaternion(0.0, this.rotation.y, 0.0, this.rotation.w);
                const quat = new Ammo.btQuaternion(rotation.x, rotation.y, rotation.z, rotation.w);

                this.body.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
                this.body.setAngularVelocity(new Ammo.btVector3(0, 0, 0));

                this.body.getWorldTransform().setOrigin(position.to_btVector3());
                this.body.getWorldTransform().setRotation(quat);
                this.body.getMotionState().setWorldTransform(this.body.getWorldTransform());
            }
        }

        if (!this.inUse && MathTools.approximate(this.speed, 0.0)) {
            if (this.engineSound !== null && this.engineSound.isPlaying)
                this.engineSound.stop();
        }

        if (!this.inUse) return;
        let axis = Vector2.zero;
        if (Gamepad.isConnected()) {
            axis = Gamepad.leftStick();
            this.steeringAngle += (-25 * axis.x) * this.steeringRate * Time.deltaTime;
        }

        if (this.engineSound !== null && !this.engineSound.isPlaying)
            this.engineSound.play();

        this.reverse = false;

        if ((Input.isKeyDown('w') || Input.isKeyDown('ArrowUp') || Gamepad.rightTrigger() > 0) && this.speed <= this.topSpeed) {
            const accel = (Gamepad.rightTrigger() > 0) ? Gamepad.rightTrigger() : 1;
            this.currentBrakingFront = 0;
            this.currentBrakingBack = 0;
            this.currentAccelBack = (this.accelForceBack * this.accelRate) * accel;
            this.currentAccelFront = (this.accelForceFront * this.accelRate) * accel;
        }
        else {
            this.currentAccelBack = 0;
            this.currentAccelFront = 0;
            this.currentBrakingFront = 0.5;
            this.currentBrakingBack = 0.5;
        }

        if (Input.isKeyDown('s') || Input.isKeyDown('ArrowDown') || Gamepad.leftTrigger() > 0) {
            this.reverse = true;
            const breaking = (Gamepad.leftTrigger() > 0) ? Gamepad.leftTrigger() : 1;
            if (this.speed <= 0) {
                this.currentBrakingFront = 0;
                this.currentBrakingBack = 0;
                this.currentAccelBack = -((this.accelForceBack * 0.5) * this.accelRate) * breaking;
                this.currentAccelFront = -((this.accelForceFront * 0.5) * this.accelRate) * breaking;
            }
            else {
                this.currentBrakingFront = this.breakForce * 0.25 * breaking;
                this.currentBrakingBack = this.breakForce * 0.25 * breaking;
            }
        }

        if (Input.isKeyDown('a') || Input.isKeyDown('ArrowLeft')) {
            this.steeringAngle += 15 * this.steeringRate * Time.deltaTime;
        }
        else
            if (Input.isKeyDown('d') || Input.isKeyDown('ArrowRight')) {
                this.steeringAngle -= 15 * this.steeringRate * Time.deltaTime;
            }
            else
                if (Vector2.Equals(axis, Vector2.zero)) {
                    this.steeringAngle = MathTools.moveTowards(this.steeringAngle, 0.0, this.steeringRate * 2.0 * Time.deltaTime);
                }

        const maxAngle = 25.0 - (20.0 * (this.speed / this.topSpeed));
        this.steeringAngle = MathTools.clamp(this.steeringAngle, -maxAngle, maxAngle);
    }

    updateSound() {
        if (Math.abs(this.body.getAngularVelocity().y()) > 1) {
            if (this.tireSquealSound !== null && this.model !== null) {

                if (!this.tireSquealSound.isPlaying)
                    this.tireSquealSound.play();

                this.tireSquealSound.panner.setPosition(this.model.mesh.position.x, this.model.mesh.position.y, this.model.mesh.position.z);

                this.tireSquealSound.setPlaybackRate(0.7);
                this.tireSquealSound.setDetune(-250);
            }
        }
        else {
            if (this.tireSquealSound !== null && this.tireSquealSound.isPlaying)
                this.tireSquealSound.stop();
        }

        if (this.engineSound !== null && this.model !== null) {

            if (this.engineSound.isPlaying && this.model.mesh) {

                this.engineSound.setDetune((Math.abs(this.speed) + this.enginePitch) * 10);
                this.engineSound.panner.setPosition(this.model.mesh.position.x, this.model.mesh.position.y, this.model.mesh.position.z);
            }
        }
    }

    updateWheels() {
        for (let i = 0; i < this.vehicle.getNumWheels(); i++) {

            this.vehicle.updateWheelTransform(i, false);

            const tm = this.vehicle.getWheelTransformWS(i);
            const p = tm.getOrigin();
            const q = tm.getRotation();

            if (this.wheelModels[i].model && this.wheelModels[i].model.mesh) {
                this.wheelModels[i].model.mesh.position.set(p.x(), p.y(), p.z());
                this.wheelModels[i].model.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
            }
        }
    }

    updateRigidBody() {
        const tm = this.body.getWorldTransform();
        const p = tm.getOrigin();
        const q = tm.getRotation();
        this.rotation.set(q.x(), q.y(), q.z(), q.w());
        this.position.set(p.x(), p.y(), p.z());
        let euler = this.rotation.Euler();
        euler.x *= MathTools.deg2Rad;
        euler.y *= MathTools.deg2Rad;
        euler.z *= MathTools.deg2Rad;
        this.rotation = Quaternion.FromEuler(euler.x, euler.y, euler.z);

        if (this.model && this.model.mesh) {
            this.model.mesh.position.set(p.x(), p.y(), p.z());
            this.model.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
    }

    updateSpeed() {
        let vel = (this.vehicle.getRigidBody().getLinearVelocity().length() - 0.163);

        if (vel < 0.009)
            vel = 0;

        const dir = this.reverse && this.speed < 0.05 ? -1 : 1;
        this.speed = vel * 9.8 * dir;
    }

    updateMovement() {
        this.vehicle.applyEngineForce(this.currentAccelFront, 0);
        this.vehicle.applyEngineForce(this.currentAccelFront, 1);
        this.vehicle.applyEngineForce(this.currentAccelBack, 2);
        this.vehicle.applyEngineForce(this.currentAccelBack, 3);

        this.vehicle.setBrake(this.currentBrakingFront, 0);
        this.vehicle.setBrake(this.currentBrakingFront, 1);
        this.vehicle.setBrake(this.currentBrakingBack / 2, 2);
        this.vehicle.setBrake(this.currentBrakingBack / 2, 3);
    }

    updateSteering() {
        this.vehicle.setSteeringValue(0, 3);
        this.vehicle.setSteeringValue(0, 2);
        this.vehicle.setSteeringValue(this.steeringAngle * MathTools.deg2Rad, 0);
        this.vehicle.setSteeringValue(this.steeringAngle * MathTools.deg2Rad, 1);
    }

    applyDownforce() {
        const downForce = this.constantDownforce ? -this.downForce : -(Math.abs(this.speed) * this.downForce);
        this.downForceVel = new Vector3(0, downForce, 0);
        this.btDownForce.setValue(this.downForceVel.x, this.downForceVel.y, this.downForceVel.z);
        this.body.applyCentralImpulse(this.btDownForce);
    }

    resetMovementWhenNotInUse() {
        if (!this.inUse) {
            this.currentBrakingFront = this.breakForce * 0.25;
            this.currentBrakingBack = this.breakForce * 0.25;
            this.currentAccelBack = 0;
            this.currentAccelFront = 0;
        }
    }

    netUpdate(vehicleUpdate) {
        this.body.setLinearVelocity(new Ammo.btVector3(vehicleUpdate.linearVelocity.x, vehicleUpdate.linearVelocity.y, vehicleUpdate.linearVelocity.z));
        this.body.setAngularVelocity(new Ammo.btVector3(vehicleUpdate.angularVelocity.x, vehicleUpdate.angularVelocity.y, vehicleUpdate.angularVelocity.z));

        this.btQuat.setValue(vehicleUpdate.rotation.x, vehicleUpdate.rotation.y, vehicleUpdate.rotation.z, vehicleUpdate.rotation.w);
        this.body.getWorldTransform().setRotation(this.btQuat);

        let newPos = vehicleUpdate.position;
        this.body.getWorldTransform().setOrigin(new Ammo.btVector3(newPos.x, newPos.y, newPos.z));
        this.steeringAngle = vehicleUpdate.steeringAngle;

        this.rotation = Quaternion.FromEuler(vehicleUpdate.rotation.x, vehicleUpdate.rotation.y, vehicleUpdate.rotation.z);
        this.vehicle.setSteeringValue(0, 3);
        this.vehicle.setSteeringValue(0, 2);
        this.vehicle.setSteeringValue(vehicleUpdate.steeringAngle * MathTools.deg2Rad, 0);
        this.vehicle.setSteeringValue(vehicleUpdate.steeringAngle * MathTools.deg2Rad, 1);
    }

    netVehicleEnter() {
        this.inNetUse = true;
        this.inUse = true;
        this.body.mass
    }

    netVehicleExit() {
        this.inNetUse = false;
        this.inUse = false;
    }

    update() {
        Camera.mainCamera.add(Audio.listener);
        this.applyDownforce();
        this.resetMovementWhenNotInUse();
        this.updateInput();
        this.updateSound();
        this.updateMovement();
        this.updateSteering();
        this.updateWheels();
        this.updateRigidBody();
        this.updateSpeed();

        if (this.engineSound !== null && this.engineSound.isPlaying && this.playerControlled) {

            if (this.inUse)
                this.netContinuedUpdateTimer = 0;

            if (!this.inUse)
                this.netContinuedUpdateTimer += Time.deltaTime;

            if (this.netContinuedUpdateTimer >= this.netContinuedUpdateTime)
                this.playerControlled = false;

            let btPos = this.body.getWorldTransform().getOrigin();
            let currentPos = new Vector3(btPos.x(), btPos.y(), btPos.z());
            this.lastPosition = currentPos;
        }
    }

    lateUpdate() {
        if (!this.inUse) return;
        this.netUpdateTimer += Time.deltaTime;

        if (this.netUpdateTimer >= 1.0 / 30.0) {
            this.netUpdateTimer = 0.0;
            let linearVelocity = this.body.getLinearVelocity();
            let angularVelocity = this.body.getAngularVelocity();

            let quat = this.body.getWorldTransform().getRotation();
            Multiplayer.updateVehicleWithServer({
                key: this.name,
                linearVelocity: new Vector3(linearVelocity.x(), linearVelocity.y(), linearVelocity.z()),
                angularVelocity: new Vector3(angularVelocity.x(), angularVelocity.y(), angularVelocity.z()),
                position: this.lastPosition,
                rotation: new Quaternion(quat.x(), quat.y(), quat.z(), quat.w()),
                steeringAngle: this.steeringAngle
            });
        }
    }

    checkVehicleInRange(pos) {
        Vehicle.checkVehicleInRange(pos)
    }
}