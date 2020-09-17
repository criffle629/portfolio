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
            Camera.position = Vector3.LerpUnclamped(Camera.position, newPos,   (30 * Time.smoothDelta));
        else
        {
            this.locked = true;
            Camera.position = newPos;
        }
        Camera.rotation = Quaternion.LookAt(Camera.position, Camera.target.position, Vector3.up);

        Camera.SetPosition(Camera.position);

        Camera.mainCamera.lookAt(Camera.target.position.x, Camera.target.position.y, Camera.target.position.z);
    }

    followCamera() {

        if (Camera.target === null) return;

        this.locked = false;

        Camera.rotation = Quaternion.LookAt(Camera.position, Camera.target.position, Vector3.up);
        let euler = Camera.target.rotation.Euler();
        euler.x *= MathTools.rad2Deg;
        euler.y *= MathTools.rad2Deg;
        euler.z *= MathTools.rad2Deg;

        const quat = Quaternion.FromEuler(euler.x, euler.y, euler.z);
        let forward = new Vector3(0, 0, -4);
        forward.rotate(quat);

        forward.y = Camera.target.position.y + 1;
        let camPos = Vector3.LerpUnclamped(Camera.position, Vector3.Add(Camera.target.position, forward),   (7 * Time.smoothDelta));
       
        Camera.SetPosition(camPos);

        Camera.mainCamera.lookAt(Camera.target.position.x, Camera.target.position.y, Camera.target.position.z);


    }
}