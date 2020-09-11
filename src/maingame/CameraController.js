import Vector3 from '../engine/Vector3';
import Camera from '../engine/Camera';
import Quaternion from '../engine/Quaternion';
import MathTools from '../engine/MathTools';
import Input from '../engine/Input';
import Gamepad from '../engine/Gamepad';

export default class CameraController{
    constructor(offset){
        this.offset = offset;
        this.fixedCameraMode = true;
        
    }

    update(){
        //if (Input.isKeyPressed('c') || Gamepad.isButtonPressed(Gamepad.Buttons.BUMPER_LEFT))
          //  this.fixedCameraMode = !this.fixedCameraMode;
    }

    lateUpdate(){
           
    if (this.fixedCameraMode)
        this.fixedCamera();
    else
        this.followCamera();

   
    }

    fixedCamera(){
        if (Camera.target === null) return;

        
        Camera.position = Vector3.Add(Camera.target.position, this.offset);
        Camera.rotation = Quaternion.LookAt(Camera.position, Camera.target.position, Vector3.up);

        Camera.SetPosition(Camera.position);

        const rot = Camera.rotation.Euler();
        rot.x *= MathTools.deg2Rad;
        rot.y *= MathTools.deg2Rad;
        rot.z *= MathTools.deg2Rad;

        Camera.Rotate(rot);
    }

    followCamera(){
     
        Camera.rotation = Quaternion.LookAt(Camera.position, Camera.target.position, Vector3.up);
 
        let forward = new Vector3(0,0,0);
        forward.rotate(Camera.target.rotation);
 
         forward.normalize();
         forward =  Vector3.Multiply(Camera.target.forward, new Vector3(-2,-2,-2));
         forward.y = Camera.target.position.y + 1;
 
        Camera.SetPosition(Vector3.Add(Camera.target.position,  forward));
        
        Camera.mainCamera.lookAt(Camera.target.position.x, Camera.target.position.y, Camera.target.position.z)
      
 
    }
}