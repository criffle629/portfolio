import Scene from './Scene';
 import Physics from './Physics';
import GameObject from './GameObject';
import Quaternion from './Quaternion';
import Vector3 from './Vector3';
import Input from './Input';
import Time from './Time';
import MathTools from './MathTools';
const Ammo = Physics.Ammo;

export default class Vehicle extends GameObject{
    constructor(options)
    {
        super();
        
        this.castShadow = true;
        this.recieveShadow = true;
        this.skinnedMesh = false;

        this.steeringRate = 100.0;

        this.breakForce = options.breakForce;
        this.accelForce = options.accelForce;
        this.tuning    = new Ammo.btVehicleTuning();
        this.raycaster  = new Ammo.btDefaultVehicleRaycaster(Physics.world);        
   
        this.bodyShape  = Physics.createBoxShape(new Vector3(options.bodyWidth , options.bodyHeight , options.bodyLength ));

        this.addRigidBody(options.mass, this.bodyShape, options.position);
        this.rigidBody.body.setActivationState(4);
        this.vehicle = new Ammo.btRaycastVehicle(this.tuning, this.rigidBody.body, this.raycaster);
      
        this.vehicle.setCoordinateSystem(0, 1, 2);
        Physics.world.addAction(this.vehicle);

        Scene.addGameObject(this);

        this.LoadModel(options.bodyModel);
    
        this.wheelModels = [];
        this.wheelModels.push(new GameObject(options.wheelModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelModel, false, true, true));
        this.wheelModels.push(new GameObject(options.wheelModel, false, true, true));

        this.wheelInfo = [];
        this.wheelInfo.push(this.createWheel(options, true, new Vector3(0.524, -0.309, 0.654), new Vector3(0, -1, 0), new Vector3(-1, 0, 0))); 
        this.wheelInfo.push(this.createWheel(options, true, new Vector3(-0.524, -0.309 , 0.654), new Vector3(0, -1, 0), new Vector3(-1, 0, 0))); 
        this.wheelInfo.push(this.createWheel(options, false, new Vector3(-0.524, -0.309, -0.719), new Vector3(0, -1, 0), new Vector3(-1, 0, 0))); 
        this.wheelInfo.push(this.createWheel(options, false, new Vector3(0.524, -0.309, -0.719), new Vector3(0, -1, 0), new Vector3(-1, 0, 0))); 
 
        this.currentAccel = 0;
        this.currentBraking = 0;
        this.steeringAngle = 0;
        this.speed = 0;
    }

    createWheel(options, front, wheelPos, wheelDir, wheelAxle){
   
        let wheel = this.vehicle.addWheel(wheelPos.to_btVector3(),  new Ammo.btVector3(0, -1, 0), new Ammo.btVector3(-1, 0, 0), options.suspensionLen, options.radius, this.tuning, front);
        
        wheel.set_m_suspensionStiffness(options.stiffness);
        wheel.set_m_wheelsDampingRelaxation(options.damping);
        wheel.set_m_wheelsDampingCompression(options.compression);
        wheel.set_m_frictionSlip(options.friction);
        wheel.set_m_rollInfluence(options.roll);

        return wheel;
    }

    updateInput(){

        if (Input.isPressed('ArrowUp') && this.speed <= 70)
            this.currentAccel += 5;
        else
            this.currentAccel = 0;
    
        if (Input.isPressed('ArrowDown'))
            this.currentBraking += 5 / 4;
        else
            this.currentBraking = 0;
    
        if (Input.isPressed('ArrowLeft'))
            this.steeringAngle -= 1 * this.steeringRate * Time.deltaTime;
        else
        if (Input.isPressed('ArrowRight'))
            this.steeringAngle += 1 * this.steeringRate * Time.deltaTime;
    
           
        this.steeringAngle = MathTools.moveTowards(this.steeringAngle, 0.0, this.steeringRate  * Time.deltaTime);
        this.steeringAngle = MathTools.clamp(this.steeringAngle, -25, 25);
        console.log(this.steeringAngle);
    }

    update(){
       
       
        this.updateInput();
 
        this.vehicle.setSteeringValue(this.steeringAngle * MathTools.deg2Rad, 0);
        this.vehicle.setSteeringValue(this.steeringAngle * MathTools.deg2Rad, 1);

        this.vehicle.applyEngineForce(this.currentAccel, 2);
        this.vehicle.applyEngineForce(this.currentAccel, 3);
 
        this.vehicle.setBrake(this.currentBraking, 0);
        this.vehicle.setBrake(this.currentBraking, 1);
        this.vehicle.setBrake(this.currentBraking / 2, 2);
        this.vehicle.setBrake(this.currentBraking / 2, 3);
        
        for (let i = 0; i < this.vehicle.getNumWheels(); i++) {
            this.vehicle.updateWheelTransform(i, true);
            const tm = this.vehicle.getWheelTransformWS(i);
            const p = tm.getOrigin();
            const q = tm.getRotation();
            let pos = new Vector3(p.x(), p.y(), p.z());
            this.wheelModels[i].setPosition(pos);
       
            let quat = new Quaternion(q.x(), q.y(), q.z(), q.w());
            let rot = Vector3.multiplyScalar(quat.Euler(), MathTools.deg2Rad);
            this.wheelModels[i].setRotation(rot);
        }
 
        this.speed = this.vehicle.getCurrentSpeedKmHour();
       
        super.update();
    }
}
