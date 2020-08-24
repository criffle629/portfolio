
import Physics from './Physics';
import Quaternion from './Quaternion';
import Vector3 from './Vector3';
import Ammo from 'ammo.js';

export default class RigidBody {

    constructor(position = new Vector3(0, 0, 0), shape,  rotation = Quaternion.Identity(), mass = 1) {

        this.isKinematic = false;
        this.active = true;
        this.mass = mass;
        this.transform = new Ammo.btTransform();
       // this.transform.setIdentity();
        this.transform.setOrigin(position.to_btVector3());
        this.transform.setRotation(new Ammo.btQuaternion(rotation.x, rotation.y, rotation.z, rotation.w));
        this.motionState = new Ammo.btDefaultMotionState(this.transform);
			
        let localInertia = new Vector3(0.0, 0.0, 0.0);

        if (mass > 0)
            shape.calculateLocalInertia(this.mass, localInertia.to_btVector3());

        let ri =new Ammo.btRigidBodyConstructionInfo(this.mass, this.motionState, shape, localInertia.to_btVector3());
        this.body = new Ammo.btRigidBody(ri);
   
        this.body.setFriction(1);
        this.body.setActivationState(4);

        //wathis.SetKinematic(mass === 0);
        
        Physics.addRigidBody(this.body);
    }

    setMass(mass) {
        this.mass = mass;
        this.body.setMassProps(mass, this.body.getLocalInertia());
    }

    SetKinematic(value) {
        this.isKinematic = value;

        if (value) {
            this.body.setMassProps(0.0, new Ammo.btVector3(0.0, 0.0, 0.0));
            this.body.setCollisionFlags(2);
            this.body.setActivationState(4);
        }
        else {
            this.body.setMassProps(this.mass, new Ammo.btVector3(0.0, 0.0, 0.0));
            this.body.setCollisionFlags(0);
            this.body.setActivationState(1);
        }
    }

    AddForce(force) {
        this.body.applyCentralForce(force.To_btVector3());
    }

    AddForceAt(force, position) {
        this.body.applyForce(force.To_btVector3(), position.To_btVector3());
    }

    SetLinearFactor(factor) {
        this.body.setLinearFactor(factor.To_btVector3());
    }

    SetSleepingThreshold(linear, angular) {
        this.body.setSleepingThresholds(linear, angular);
    }

    ApplyTorque(torque) {
        this.body.applyTorque(torque.To_btVector3());
    }

    ApplyCentralImpulse(impulse) {
        this.body.applyCentralImpulse(impulse.To_btVector3());
    }

    ApplyTorqueImpulse(impulse) {
        this.body.applyTorqueImpulse(impulse.To_btVector3());
    }

    ApplyImpulse(impulse) {
        this.body.applyImpulse(impulse.To_btVector3(), this.body.getCenterOfMassPosition());
    }

    ApplyImpulseAt(impulse, position) {
        this.body.applyImpulse(impulse.To_btVector3(), position.To_btVector3());
    }

    ClearForces() {
        this.body.clearForces();
    }

    GetOrentation() {
        let quat = this.body.getOrientation();

        return new Quaternion(quat.x(), quat.y(), quat.z(), quat.w());
    }


    GetLinearVelocity() {
        let v = this.body.getLinearVelocity();

        return new Vector3(v.x(), v.y(), v.z());
    }

    GetAngularVelocity() {
        let v = this.body.getAngularVelocity();

        return new Vector3(v.x(), v.y(), v.z());
    }

    SetLinearVelocity(velocity) {
        this.bodysetLinearVelocity(velocity.To_btVector3());
    }

    setAngularVelocity(velocity) {
        this.body.setAngularVelocity(velocity.To_btVector3());
    }

    translate(position) {
        this.body.translate(position.To_btVector3());
    }

    setPosition(position) {
        this.body.getWorldTransform().setOrigin(Vector3.toBTV3(position));
    }

    Move(position) {
        this.body.translate(position.To_btVector3());
    }

    setRotation(rotation) {
        let quat = new Ammo.btQuaternion(rotation.x, rotation.y, rotation.z, rotation.w);
        this.body.getWorldTransform().setRotation(quat);
        this.body.getMotionState().setWorldTransform(this.body.getWorldTransform());
    }

    setQuaternion(quat){
        this.body.getWorldTransform().setRotation(quat);
        this.body.getMotionState().setWorldTransform(this.body.getWorldTransform());
    }

    WantsSleep() {
        return this.body.wantsSleeping();
    }z

    GetMotionState() {
        return this.body.getMotionState();
    }

    SetMotionState(state) {
        this.body.setMotionState(state);
    }

    SetAngularFactor(factor) {
        this.body.setAngularFactor(factor.To_btVector3());
    }

    GetAngularFactor() {
        let v = this.body.getAngularFactor();
        return new Vector3(v.x(), v.y(), v.z());
    }

    IsInWorld() {
        return this.body.isInWorld();
    }

    AddContraint(constraint) {
        this.addConstraintRef(constraint);
    }

    RemoveContraint(constriant) {
        this.removeConstraintRef(constriant);
    }

    SetFlags(flags) {
        this.setFlags(flags);
    }

    GetFlags() {
        return this.getFlags();
    }

    GetLocalInertia() {
        let v = this.body.getLocalInertia()
        return new Vector3(v.x(), v.y(), v.z());
    }

    IsActive() {
        return this.active;
    }

    SetActive(value) {
        //  if (value)
        //      Physics:: instance -> AddRigidBody(rigidBody);
        //  else
        //        Physics:: instance -> RemoveRigidBody(rigidBody);

        //  active = value;
    }

    GetCollisionShape() {
        return this.body.getCollisionShape();
    }

    SetCollisionShape(collider) {
        this.body.setCollisionShape(collider);
        this.body.setRollingFriction(0.3);
    }

    GetCollisionFlags() {
        return this.body.getCollisionFlags();
    }

    SetCollisionFlags(flags) {
        this.body.setCollisionFlags(flags);
    }

    GetPosition() {
        let v = this.body.getWorldTransform().getOrigin();
        
        return new Vector3(v.x(), v.y(), v.z());
    }

    GetRotation() {
        let quat = this.body.getWorldTransform().getRotation();
 
        return new Quaternion(quat.x(), quat.y(), quat.z(), quat.w());;
    }

    SetActivationState(state) {
        this.body.setActivationState(state);
    }

    SetBounciness(value) {
        this.body.setRestitution(value);
    }

    IsKinematic() {
        return this.isKinematic;
    }

    SetFriction(value) {
        this.body.setFriction(value);
    }
}