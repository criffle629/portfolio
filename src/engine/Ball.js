import Scene from './Scene';
import Physics from './Physics';
import GameObject from './GameObject';

import Vector3 from './Vector3';

import Ammo from 'ammo.js';
import Quaternion from './Quaternion';


export default class Ball extends GameObject {
    constructor(options = { position: Vector3.zero, rotation: Quaternion.Identity(), mass: 1 }) {
        super('ball', null, false, true, true, false, Vector3.zero, Quaternion.Identity());

        this.inUse = false;
        this.castShadow = true;
        this.recieveShadow = true;
        this.skinnedMesh = false;

        this.options = options;
        this.shape = Physics.createSphereShape(0.5);
        this.body = null;

        
        this.LoadModel('soccerball', './assets/models/soccerball.glb', true)
            .then((model) => {

                var transform = new Ammo.btTransform();
                transform.setIdentity();
                transform.setOrigin(new Ammo.btVector3(this.options.position.x, this.options.position.y, this.options.position.z));
                transform.setRotation(new Ammo.btQuaternion(this.options.rotation.x, this.options.rotation.y, this.options.rotation.z, this.options.rotation.w));
                var motionState = new Ammo.btDefaultMotionState(transform);
                var localInertia = new Ammo.btVector3(0, 0, 0);
                this.shape.calculateLocalInertia(this.options.mass, localInertia);
                this.body = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(this.options.mass, motionState, this.shape, localInertia));
                this.body.setActivationState(4);

                Physics.world.addRigidBody(this.body);
                Scene.addGameObject(this);

                this.body.setFriction(1);
                this.body.setRestitution(0.8);
                this.body.setRollingFriction(1);
                this.body.setDamping(0.2, 0.1);
            });
    }

    update() {
        if (this.body === null) return;
            const p = this.body.getWorldTransform().getOrigin();
            const q = this.body.getWorldTransform().getRotation();

            if (this.model && this.model.mesh) {
                this.model.mesh.position.set(p.x(), p.y(), p.z());
                this.model.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
                this.position = new Vector3(p.x(), p.y(), p.z());
                this.rotation = new Quaternion(q.x(), q.y(), q.z(), q.w());
            }
    }
}
