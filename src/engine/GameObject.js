import Vector3 from './Vector3';
import SkinnedMesh from './SkinnedMesh';
import Mesh from './Mesh';
import Scene from './Scene';
import RigidBody from './RigidBody';
import Quaternion from './Quaternion';
 
export default class GameObject {

    static id = 0;

    constructor(meshPath = null, skinnedMesh = false, castShadow = false, recieveShadow = false, flatShading = false) {
        this.position = new Vector3(0.0, 0.0, 0.0); 
        this.rotation = new Quaternion();
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
        GameObject.id++;

        this.LoadModel(meshPath, flatShading);
    }

    LoadModel(meshPath, flatShading = false) {

        if (meshPath === null) return;

        this.loadMesh(meshPath, this.skinnedMesh, this.castShadow, this.recieveShadow, flatShading)
            .then(data => {
                this.model = data;
            })
            .catch(e => {
                console.log(e);
            });
        Scene.addGameObject(this);
    }

    async loadMesh(meshPath, skinnedMesh, castShadow = false, recieveShadow = false, flatShading = false) {
        this.castShadow = castShadow;
        this.recieveShadow = recieveShadow;
        return new Promise((resolve, reject) => {
            if (skinnedMesh) {
                this.model = new SkinnedMesh(meshPath, castShadow, recieveShadow, flatShading);
                resolve(this.model);
            }
            else {
       
                this.model = new Mesh(null, castShadow, recieveShadow, flatShading);
                this.model.LoadMesh(meshPath)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(e => {
                        reject(e);
                    });
            }
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
        this.rotation = new Quaternion(quat.x(), quat.y(), quat.z(), quat.w());

        if (this.rigidBody !== null)
            this.rigidBody.setQuaternion(quat);
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
            this.rigidBody.setPosition(new Vector3(this.position.x, this.position.y, this.position.z));
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

    lateUpdate(){}

    addRigidBody(mass = 1, shape = null, position = Vector3.zero, rotation = Quaternion.Identity()) {
        this.rigidBody = new RigidBody(position, shape, rotation, mass);
    }

    render() {
        if (this.skinnedMesh)
            this.model.Animate();
    }

    collision(col) {
        //console.log(col);
    }
}