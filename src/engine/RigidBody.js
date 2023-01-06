
import Physics from './Physics';
import Quaternion from './Quaternion';
import Vector3 from './Vector3';
import Ammo from 'ammo.js';
import MathTools from './MathTools';
import { v4 as uuidv4 } from 'uuid';

export default class RigidBody {

    constructor(position = new Vector3(0, 0, 0), shape, rotation = Quaternion.Identity(), options = { mass: 0, friction: 1, rollingFriction: 1, restitution: 0.8 }) {
        this.isKinematic = false;
        this.active = true;
        this.mass = options.mass;

        this.shape = shape;
        this.friction = options.friction;
        this.rollingFriction = options.rollingFriction;
        this.restitution = options.restitution;
        this.ragdollActive = false;

        this.btPos = new Ammo.btVector3(position.x, position.y, position.z);
        this.btQuat = new Ammo.btQuaternion(rotation.x, rotation.y, rotation.z, rotation.w);

        this.id = uuidv4();

        this.cachedbtVec3 = new Ammo.btVector3(0, 0, 0);
        this.transform = new Ammo.btTransform();
        this.transform.setIdentity();
        this.transform.setOrigin(this.btPos);
        this.transform.setRotation(this.btQuat);
        this.motionState = new Ammo.btDefaultMotionState(this.transform);

        let localInertia = new Ammo.btVector3(0.0, 0.0, 0.0);
        //localInertia = this.shape.calculateLocalInertia(this.mass, localInertia);
        let ri = new Ammo.btRigidBodyConstructionInfo(this.mass, this.motionState, this.shape, localInertia);
        this.position = position;
        this.rotation = rotation;

        this.body = new Ammo.btRigidBody(ri);;

        this.body.setFriction(this.friction);
        this.body.setDamping(0.25, 0.25);
        this.body.setCcdMotionThreshold(1);
        this.body.setCcdSweptSphereRadius(0.2);
        this.body.setRestitution(this.restitution);

        this.SetKinematic(MathTools.approximate(this.mass, 0.0));
        Physics.addRigidBody(this.body);
    }

    removeRigidBody() {
        Physics.removeRigidBody(this.body);
    }

    setMass(mass) {
        if (this.body) {
            this.mass = mass;
            this.body.setMassProps(mass, new Ammo.btVector3(0.0, 0.0, 0.0));
        }
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
            this.body.setActivationState(4);
        }
    }

    AddForce(force) {
        this.body.applyCentralForce(force.to_btVector3());
    }

    AddImpulseForce(force) {
        this.body.applyCentralImpulse(force.to_btVector3());
    }

    AddForceAt(force, position) {
        this.body.applyForce(force.to_btVector3(), position.to_btVector3());
    }

    SetLinearFactor(factor) {
        this.body.setLinearFactor(factor.to_btVector3());
    }

    SetSleepingThreshold(linear, angular) {
        this.body.setSleepingThresholds(linear, angular);
    }

    ApplyTorque(torque) {
        this.body.applyTorque(torque.to_btVector3());
    }

    ApplyCentralImpulse(impulse) {
        this.body.applyCentralImpulse(impulse.to_btVector3());
    }

    ApplyTorqueImpulse(impulse) {
        this.body.applyTorqueImpulse(impulse.to_btVector3());
    }

    ApplyImpulse(impulse) {
        this.body.applyImpulse(impulse.to_btVector3(), new Ammo.btVector3(0, 0, 0));
    }

    ApplyImpulseAt(impulse, position) {
        this.body.applyImpulse(impulse.to_btVector3(), position.to_btVector3());
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
        this.bodysetLinearVelocity(velocity.to_btVector3());
    }

    setAngularVelocity(velocity) {
        this.body.setAngularVelocity(velocity.to_btVector3());
    }

    translate(position) {
        this.body.translate(position.to_btVector3());
    }

    setPosition(position) {
        this.btPos.setValue(position.x, position.y, position.z);
        this.body.getWorldTransform().setOrigin(this.btPos);
    }

    Move(position) {
        this.body.translate(position.to_btVector3());
    }

    setRotation(rotation) {
        this.btQuat.setValue(rotation.x, rotation.y, rotation.z, rotation.w);
        this.body.getWorldTransform().setRotation(this.btQuat);
        this.body.getMotionState().setWorldTransform(this.body.getWorldTransform());
    }

    setQuaternion(quat) {
        this.body.getWorldTransform().setRotation(quat);
        this.body.getMotionState().setWorldTransform(this.body.getWorldTransform());
    }

    WantsSleep() {
        return this.body.wantsSleeping();
    }

    GetMotionState() {
        return this.body.getMotionState();
    }

    SetMotionState(state) {
        this.body.setMotionState(state);
    }

    SetAngularFactor(factor) {
        Physics.removeRigidBody(this.body);
        this.body.setAngularFactor(factor.to_btVector3());
        Physics.addRigidBody(this.body);
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

    GetCollisionShape() {
        return this.body.getCollisionShape();
    }

    SetCollisionShape(collider) {
        this.body.setCollisionShape(collider);
    }

    SetRollingFriction(friction) {
        Physics.removeRigidBody(this.body);
        this.body.setRollingFriction(friction);
        Physics.addRigidBody(this.body);
    }

    SetRestitution(restitiuion) {
        Physics.removeRigidBody(this.body);
        this.body.setRestitution(restitiuion);
        Physics.addRigidBody(this.body);
    }

    GetCollisionFlags() {
        return this.body.getCollisionFlags();
    }

    SetCollisionFlags(flags) {
        this.body.setCollisionFlags(flags);
    }

    GetPosition() {
        let v = this.body.getWorldTransform().getOrigin();
        this.position.set(v.x(), v.y(), v.z());
        return this.position;
    }

    GetRotation() {
        let quat = this.body.getWorldTransform().getRotation();
        this.rotation.set(quat.x(), quat.y(), quat.z(), quat.w());
        return this.rotation;
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