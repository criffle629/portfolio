import * as THREE from "three";
import Scene from "./Scene";

class CameraManager{
    constructor(){
        this.mainCamera = new THREE.PerspectiveCamera(60, 1024 / 600, 0.1, 1000);
    }

    Configure(fov, aspect, zNear, zFar){
        this.mainCamera = new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
    }

    Move(pos){
        this.mainCamera.translateX(pos.x);
        this.mainCamera.translateY(pos.y);
        this.mainCamera.translateZ(pos.z);
    }

    Rotate(rot){
        this.mainCamera.rotation.set(rot.x, rot.y, rot.z);
    }

    SetPosition(pos){
        this.mainCamera.position.set(pos.x, pos.y, pos.z);
    }
}

const Camera = new CameraManager();

export default Camera;