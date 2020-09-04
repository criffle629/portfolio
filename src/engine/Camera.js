import * as THREE from "three";
import Quaternion from "./Quaternion";
import Scene from "./Scene";
import GameObject from './GameObject';
import Vector3 from './Vector3';

class CameraManager extends GameObject {
    constructor() {
        super();
        this.mainCamera = new THREE.PerspectiveCamera(60, 1024 / 600, 0.1, 1000);
        this.target = null;
        this.heigth = 3.0;
        this.distance = 5.0;
        this.position = Vector3.zero;
        this.offset = new Vector3(0, this.heigth, this.distance);
        Scene.addGameObject(this);
    }

    Configure(fov, aspect, zNear, zFar) {
        this.mainCamera = new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
    }

    Move(pos) {
        this.mainCamera.translateX(pos.x);
        this.mainCamera.translateY(pos.y);
        this.mainCamera.translateZ(pos.z);
    }

    Rotate(rot) {
        this.mainCamera.rotation.set(rot.x, rot.y, rot.z);
    }

    SetPosition(pos) {
        this.mainCamera.position.set(pos.x, pos.y, pos.z);
    }

    GetCamera() {
        return this.mainCamera;
    }

    lateUpdate() {

        if (this.target === null) return;

        this.position = Vector3.Add(this.target.position, this.offset);
        this.rotation = Quaternion.LookAt(this.position, this.target.position, Vector3.up);

        this.SetPosition(this.position);

        const rot = this.rotation.Euler();

        this.Rotate(rot);
    }
}

const Camera = new CameraManager();

export default Camera;