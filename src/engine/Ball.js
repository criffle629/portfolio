import Scene from './Scene';
import Physics from './Physics';
import GameObject from './GameObject';
import Vector3 from './Vector3';
import Ammo from 'ammo.js';
import Quaternion from './Quaternion';
import Vector2 from './Vector2';

export default class Ball extends GameObject {
    constructor(options = { position: Vector3.zero, rotation: Quaternion.Identity(), mass: 1, friction: 1, rollingFriction: 0.8, damping: new Vector2(0.2, 0.1), restitution: 0.8, radius: 1, model: '' }) {
        super(options.model, null, false, true, true, false, Vector3.zero, Quaternion.Identity());

        this.inUse = false;
        this.castShadow = true;
        this.recieveShadow = true;
        this.skinnedMesh = false;

        this.options = options;
        this.shape = Physics.createSphereShape(options.radius);
        this.body = null;
        this.tag = options.tag;

        this.LoadModel(options.model, options.model, false, false)
            .then(() => {

                let transform = new Ammo.btTransform();
                transform.setIdentity();
                transform.setOrigin(new Ammo.btVector3(this.options.position.x, this.options.position.y, this.options.position.z));
                transform.setRotation(new Ammo.btQuaternion(this.options.rotation.x, this.options.rotation.y, this.options.rotation.z, this.options.rotation.w));
                let motionState = new Ammo.btDefaultMotionState(transform);
                let localInertia = new Ammo.btVector3(0, 0, 0);
                this.shape.calculateLocalInertia(this.options.mass, localInertia);
                this.body = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(this.options.mass, motionState, this.shape, localInertia));
                this.body.setActivationState(4);

                this.body.setFriction(this.options.friction);
                this.body.setRestitution(this.options.restitution);
                this.body.setRollingFriction(this.options.rollingFriction);
                this.body.setDamping(this.options.damping.x, this.options.damping.y);

                Physics.world.addRigidBody(this.body);
                Scene.addGameObject(this);
            });
    }

    update() {
        if (this.body === null) return;
        const p = this.body.getWorldTransform().getOrigin();
        const q = this.body.getWorldTransform().getRotation();

        if (this.model && this.model.mesh) {
            this.model.mesh.position.set(p.x(), p.y(), p.z());
            this.model.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
            this.position.set(p.x(), p.y(), p.z());
            this.rotation.set(q.x(), q.y(), q.z(), q.w());
        }
    }
}
