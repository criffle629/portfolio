'use strict';
import * as THREE from "three";

class CameraManager{
    constructor(){
        this.mainCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    Configure(fov, aspect, zNear, zFar){
        this.mainCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    Move(pos){
        this.mainCamera.translateX(pos.x);
        this.mainCamera.translateY(pos.y);
        this.mainCamera.translateZ(pos.z);
    }

    SetPosition(pos){
        this.mainCamera.position.set(pos.x, pos.y, pos.z);
    }
    
}

const Camera = new CameraManager();

export default Camera;