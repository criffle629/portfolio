import Vector3 from '../engine/Vector3';
import Camera from '../engine/Camera';
import Quaternion from '../engine/Quaternion';
import MathTools from '../engine/MathTools';

export default class CameraController{
    constructor(offset){
        this.offset = offset;
    }

    update(){

    }

    lateUpdate(){
                    
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
}