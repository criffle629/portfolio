import Vector3 from '../engine/Vector3';
import Camera from '../engine/Camera';
import VehicleManager from '../engine/VehicleManager';

export default class CameraController{
    constructor(offset, ball){
        this.offset = offset;
      
        this.forward = new Vector3(0, 0, -1);
        this.up = new Vector3(0, 0, 0);
        this.direction = new Vector3(0, 0, 0);
        this.ball = ball;
        this.lookAtSpeed = 3.0;
        Camera.target = ball;
    }

    update(){

    }

    lateUpdate(){
                    
        if (this.ball === null || VehicleManager.vehicleInUse === null) return;

        this.direction.x = this.ball.position.x - VehicleManager.vehicleInUse.position.x;
        this.direction.y = this.ball.position.y - VehicleManager.vehicleInUse.position.y;
        this.direction.z = this.ball.position.z - VehicleManager.vehicleInUse.position.z;

        this.direction.normalize();
        this.direction.x *= -5.0;
        this.direction.y *= -5.0;
        this.direction.z *= -5.0;

        Camera.position.x = VehicleManager.vehicleInUse.position.x + this.direction.x;
        Camera.position.y = VehicleManager.vehicleInUse.position.y + this.direction.y;
        Camera.position.z = VehicleManager.vehicleInUse.position.z + this.direction.z;
       
        Camera.position.y = VehicleManager.vehicleInUse.position.y + 1;

        Camera.SetPosition(Camera.position);

        Camera.mainCamera.lookAt(this.ball.position.x, this.ball.position.y, this.ball.position.z);
    }
}