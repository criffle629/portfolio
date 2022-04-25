import Camera from '../engine/Camera';
import Gamepad from '../engine/Gamepad';
import Input from '../engine/Input';
import MathTools from '../engine/MathTools';
import Quaternion from '../engine/Quaternion';
import Vector3 from '../engine/Vector3';
  

export default class CameraController {
    constructor(offset) {
        this.offset = offset;
        this.fixedCameraMode = true;
        this.locked = true;
        this.followDistance = 3;
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

         let euler = Camera.target.rotation.Euler();
        euler.x *= MathTools.rad2Deg;
        euler.y *= MathTools.rad2Deg;
        euler.z *= MathTools.rad2Deg;

        const quat = Quaternion.FromEuler(euler.x, euler.y, euler.z);
        let forward = new Vector3(0, 0, -1);
        forward.rotate(quat);

        forward = Vector3.MultiplyScalar(forward, 4.0);
        forward.y = Camera.target.position.y + 1;   
 
        Camera.SetPosition(Vector3.Add(Camera.target.position, forward));

        Camera.mainCamera.lookAt(Camera.target.position.x, Camera.target.position.y, Camera.target.position.z);
    }
}