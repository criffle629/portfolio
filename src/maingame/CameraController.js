import Camera from '../engine/Camera';
import Gamepad from '../engine/Gamepad';
import Input from '../engine/Input';
import MathTools from '../engine/MathTools';
import Quaternion from '../engine/Quaternion';
import Vector3 from '../engine/Vector3';
import Time from '../engine/Time';

export default class CameraController {
    constructor(offset) {
        this.offset = offset;
        this.fixedCameraMode = true;
        this.locked = true;
        this.followDistance = 3;
        this.maxDistance = 5;
        this.minDistance = 1;
        this.followHeight = 1;
        this.newTargetPos = new Vector3();
    } 

    update() {
        if (Input.isKeyPressed('c') || Gamepad.isButtonPressed(Gamepad.Buttons.BUMPER_LEFT))
            this.fixedCameraMode = !this.fixedCameraMode;
    }

    lateUpdate() {
        if (this.fixedCameraMode)
            this.fixedCamera();
        else
            this.followCamera();
    }

    fixedCamera() {
        if (Camera.target === null) return;

        const newPos = Vector3.Add(Camera.target.position, this.offset);

        if (Vector3.Distance(Camera.position, newPos) > 0.2 && !this.locked)
            Camera.position = Vector3.MoveTowards(Camera.position, newPos,   0.1);
        else{
            this.locked = true;
            Camera.position = newPos;
        }
        let camPos = Vector3.LerpUnclamped(Camera.position, newPos, 0.1);
       
        Camera.SetPosition(camPos);
 
        Camera.mainCamera.lookAt(Camera.target.position.x, Camera.target.position.y, Camera.target.position.z);

    }

    followCamera() {
        if (Camera.target === null) return;

        this.locked = false;

        const euler = Camera.target.rotation.Euler();

        const quat = Quaternion.FromEulerRad(euler.x, euler.y, euler.z);
        let forward = new Vector3(0, 1, -4);
        forward.rotate(quat);   
 
        let newPos = Vector3.Add(Camera.target.position, forward);
        let camPos = Vector3.Lerp(Camera.position, newPos, 5.0 * 0.0125);

        let dist = Vector3.Distance(Camera.target.position, camPos);
        dist = MathTools.clamp(dist, this.minDistance, this.maxDistance);

        if (dist < this.minDistance){
            forward = new Vector3(0, 1, -this.minDistance);
            forward.rotate(quat);  
            newPos = Vector3.Add(Camera.target.position, forward);
            camPos = newPos;
        }
        else
        if (dist > this.maxDistance){
            forward = new Vector3(0, 1, -this.maxDistance);
            forward.rotate(quat);  
            newPos = Vector3.Add(Camera.target.position, forward);
            camPos = newPos;
        }

        if (camPos.y < 1.0)
            camPos.y = 1.0;

        Camera.SetPosition(camPos);

        Camera.mainCamera.lookAt(Camera.target.position.x, Camera.target.position.y, Camera.target.position.z);
    }
}