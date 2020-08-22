import Scene from './Scene';
import Physics from './Physics';
import GameObject from './GameObject';
import Quaternion from './Quaternion';
import Vector3 from './Vector3';
import Input from './Input';
import Time from './Time';
import MathTools from './MathTools';
import { LessDepth } from 'three';
const Ammo = Physics.Ammo;

export default class Vehicle extends GameObject {
    constructor(options) {
        super();

        this.castShadow = true;
        this.recieveShadow = true;
        this.skinnedMesh = false;

        this.steeringRate = 500.0;

        this.breakForce = options.breakForce;
        this.accelForce = options.accelForce;


        this.bodyShape = Physics.createBoxShape(new Vector3(options.bodyWidth, options.bodyHeight, options.bodyLength));

        //  this.addRigidBody(options.mass, this.bodyShape, options.position)

        var transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(options.position.x, options.position.y, options.position.z));
        transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
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

        this.LoadModel(options.bodyModel);

        this.wheelModels = [];
        this.wheelModels.push(new GameObject(options.wheelModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelModel, false, true, true));

        for (let i = 0; i < this.wheelModels.length; i++) {
            this.wheelModels[i].allowUpdate = false;
        }

        this.wheelInfo = [];
        this.wheelInfo.push(this.createWheel(options, true, new Vector3(-0.524, -0.309, 0.719), new Vector3(0, -1, 0), new Vector3(-1, 0, 0)));
        this.wheelInfo.push(this.createWheel(options, true, new Vector3(0.524, -0.309, 0.719), new Vector3(0, -1, 0), new Vector3(1, 0, 0)));
        this.wheelInfo.push(this.createWheel(options, false, new Vector3(0.524, -0.309, -0.654), new Vector3(0, -1, 0), new Vector3(1, 0, 0)));
        this.wheelInfo.push(this.createWheel(options, false, new Vector3(-0.524, -0.309, -0.654), new Vector3(0, -1, 0), new Vector3(-1, 0, 0)));

        this.tuning = new Ammo.btVehicleTuning();
        this.currentAccel = 0;
        this.currentBraking = 0;
        this.steeringAngle = 0;
        this.speed = 0;
    }

    createWheel(options, front, wheelPos, wheelDir, wheelAxle) {

        let wheel = this.vehicle.addWheel(wheelPos.to_btVector3(), wheelDir.to_btVector3(), wheelAxle.to_btVector3(), options.suspensionLen, options.radius, this.tuning, front);

        wheel.set_m_suspensionStiffness(options.stiffness);
        wheel.set_m_wheelsDampingRelaxation(options.damping);
        wheel.set_m_wheelsDampingCompression(options.compression);
        wheel.set_m_frictionSlip(options.friction);
        wheel.set_m_rollInfluence(options.roll);

        return wheel;
    }

    updateInput() {

        if (Input.isPressed('ArrowUp') && this.speed <= 70)
            this.currentAccel += 5;
        else
            this.currentAccel = 0;

        if (Input.isPressed('ArrowDown'))
            this.currentBraking += 5 / 4;
        else
            this.currentBraking = 0;

        if (Input.isPressed('ArrowLeft'))
            this.steeringAngle += 1 * this.steeringRate * Time.deltaTime;
        else
            if (Input.isPressed('ArrowRight'))
                this.steeringAngle -= 1 * this.steeringRate * Time.deltaTime;
            else
                this.steeringAngle = MathTools.moveTowards(this.steeringAngle, 0.0, this.steeringRate * Time.deltaTime);

        this.steeringAngle = MathTools.clamp(this.steeringAngle, -25, 25);
    }

    update() {

        this.updateInput();

        this.vehicle.applyEngineForce(-this.currentAccel, 2);
        this.vehicle.applyEngineForce(this.currentAccel, 3);

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

            this.vehicle.updateWheelTransform(i, true);
            tm = this.vehicle.getWheelTransformWS(i);
            p = tm.getOrigin();
            q = tm.getRotation();
            if (this.wheelModels[i].model.mesh) {
                this.wheelModels[i].model.mesh.position.set(p.x(), p.y(), p.z());
                this.wheelModels[i].model.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
            }

        }
        tm = this.vehicle.getChassisWorldTransform();
        p = tm.getOrigin();
        q = tm.getRotation();

        if (this.model.mesh) {
            this.model.mesh.position.set(p.x(), p.y(), p.z());
            this.model.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }

        this.speed = this.vehicle.getCurrentSpeedKmHour();

        //super.update();
    }
}
