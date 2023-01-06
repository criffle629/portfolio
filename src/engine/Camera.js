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

        this.position = Vector3.zero;

        this.controller = null;
        Scene.addGameObject(this);
    }

    Configure(fov, aspect, zNear, zFar) {
        this.mainCamera = new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
    }

    SetController(controller) {
        this.controller = controller;
    }

    Move(pos) {
        this.mainCamera.translateX(pos.x);
        this.mainCamera.translateY(pos.y);
        this.mainCamera.translateZ(pos.z);
    }

    Rotate(rot) {
        this.rotation = Quaternion.FromEuler(rot.x, rot.y, rot.z);
        this.mainCamera.rotation.set(rot.x, rot.y, rot.z);
    }

    SetPosition(pos) {
        this.position = pos;
        this.mainCamera.position.set(pos.x, pos.y, pos.z);
    }

    SetPositionXYZ(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.mainCamera.position.set(x, y, z);
    }

    GetCamera() {
        return this.mainCamera;
    }

    update() {
        if (this.controller !== null)
            this.controller.update();
    }

    lateUpdate() {
        if (this.controller !== null)
            this.controller.lateUpdate();
    }
}

const Camera = new CameraManager();

export default Camera;