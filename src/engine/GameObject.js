import Vector3 from './Vector3';
import Scene from './Scene';
import RigidBody from './RigidBody';
import Quaternion from './Quaternion';
import Content from './Content';
import Ammo from 'ammo.js';
import MathTools from './MathTools';

export default class GameObject {

    static id = 0;

    constructor(name = null, meshPath = null, skinnedMesh = false, castShadow = false, recieveShadow = false, flatShading = false, position = Vector3.zero, rotation = Quaternion.Identity()) {
        this.position = position;
        this.rotation = rotation;
        this.scale = new Vector3(0.0, 0.0, 0.0);
        this.isEnabled = true;
        this.texture = null;
        this.model = null;
        this.skinnedMesh = skinnedMesh;
        this.forward = Vector3.forward;
        this.objID = GameObject.id;
        this.rigidBody = null;
        this.castShadow = castShadow;
        this.recieveShadow = recieveShadow;
        this.allowUpdate = true;
        this.name = name;
        GameObject.id++;

        this.LoadModel(name, meshPath, flatShading);
        Scene.addGameObject(this);
    }

    LoadModel = async (name, meshPath, flatShading = false) => {

        if (meshPath === null) return;

        await Content.LoadMesh(name, meshPath, this.skinnedMesh, this.castShadow, this.recieveShadow, flatShading)
            .then(model => {
                this.model = model;

                this.setPosition(this.position);
                this.setRotation(this.rotation);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setEnabled(value) {
        this.isEnabled = value;

        if (this.isEnabled)
            Scene.enableObject(this);
        else
            Scene.disableObject(this);
    }

    setRotation(degrees) {
        this.rotation = Quaternion.FromEuler(degrees.x, degrees.y, degrees.z);

        if (this.rigidBody !== null)
            this.rigidBody.setRotation(this.rotation);
    }

    setQuaternion(quat) {
        this.rotation = quat;

        if (this.rigidBody !== null)
            this.rigidBody.setQuaternion(new Ammo.btQauternion(quat.x, quat.y, quat.z, quat.w));
    }

    rotate(degrees) {
        if (this.rigidBody !== null) {
            const euler = Vector3.zero;
            this.rigidBody.setRotation(euler);
            const rot = Vector3.Add(degrees, new Vector3(euler.x, euler.y, euler.z));
            this.rotation = Quaternion.FromEuler(rot.x, rot.y, rot.z);
            this.rigidBody.setRotation(this.rotation);
        }
        else
            this.rotation = Vector3.Add(this.rotation, degrees);
    }

    setPosition(newPosition) {
        this.position = newPosition;

        if (this.rigidBody !== null)
            this.rigidBody.setPosition(this.position);
    }

    move(pos) {

        if (this.rigidBody !== null) {
            this.position = this.rigidBody.GetPosition();
            this.position = Vector3.Add(this.position, pos);
            this.rigidBody.setPosition(new Vector3(this.position.x, this.position.y, this.position.z));
        }
        else {
            this.position = Vector3.Add(this.position, pos);
        }
    }

    setScale(newScale) {
        this.scale = newScale;
    }

    changeScale(scaleVector) {
        this.scale.x += scaleVector.x;
        this.scale.y += scaleVector.y;
        this.scale.z += scaleVector.z;
    }

    update() {

        if (!this.allowUpdate) return;

        if (this.rigidBody !== null) {
            this.position = this.rigidBody.GetPosition();
            this.rotation = this.rigidBody.GetRotation();
        }

        if ((this.model === null || !this.model.hasOwnProperty('mesh')))
            return;

        if (this.model.mesh === null)
            return;

        const rot = this.rotation.Euler();
    
        this.model.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.model.mesh.rotation.set(rot.x, rot.y, rot.z);
    }

    lateUpdate() { }

    addRigidBody(options = {mass: 0, friction: 1, rollingFriction: 1, restitution: 0.8}, shape = null, position = Vector3.zero, rotation = Quaternion.Identity()) {
        this.rigidBody = new RigidBody(position, shape, rotation, options);
    }

    render() {
        if (this.skinnedMesh && this.model)
            this.model.Animate();
    }

    collision(col) {
        //console.log(col);
    }
}