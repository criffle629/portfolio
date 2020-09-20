import Vector3 from '../engine/Vector3';
import Camera from '../engine/Camera';
import Quaternion from '../engine/Quaternion';
import MathTools from '../engine/MathTools';
import Input from '../engine/Input';
import Gamepad from '../engine/Gamepad';
import Time from '../engine/Time';

export default class CameraController {
    constructor(offset) {
        this.offset = offset;
        this.fixedCameraMode = true;
        this.locked = true;
        this.followDistance = 3;
        this.followHeight = 1;

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
        else
        {
            this.locked = true;
            Camera.position = newPos;
        }
 
        Camera.SetPosition(Camera.position);

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
        
        forward = Vector3.MultiplyScalar(forward, 4);
        forward.y = Camera.target.position.y + 1;

        const dist = Vector3.Distance(Camera.target.position, Camera.position);
        let camPos = Vector3.MoveTowards(Camera.position, Vector3.Add(Camera.target.position, forward), (0.5 * dist) * Time.smoothDelta);
       
        Camera.SetPosition(camPos);

        Camera.mainCamera.lookAt(Camera.target.position.x, Camera.target.position.y, Camera.target.position.z);
    }
}