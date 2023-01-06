import Vector3 from '../engine/Vector3';
import Camera from '../engine/Camera';
import Vehicle from '../engine/Vehicle';

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

    update(){}

    lateUpdate(){
                    
        if (this.ball === null || Vehicle.vehicleInUse === null) return;

        this.direction.x = this.ball.position.x - Vehicle.vehicleInUse.position.x;
        this.direction.y = this.ball.position.y - Vehicle.vehicleInUse.position.y;
        this.direction.z = this.ball.position.z - Vehicle.vehicleInUse.position.z;

        this.direction.normalize();
        this.direction.x *= -5.0;
        this.direction.y *= -5.0;
        this.direction.z *= -5.0;

        Camera.position.x = Vehicle.vehicleInUse.position.x + this.direction.x;
        Camera.position.y = Vehicle.vehicleInUse.position.y + this.direction.y;
        Camera.position.z = Vehicle.vehicleInUse.position.z + this.direction.z;
       
        Camera.position.y = Vehicle.vehicleInUse.position.y + 1;

        Camera.SetPosition(Camera.position);

        Camera.mainCamera.lookAt(this.ball.position.x, this.ball.position.y, this.ball.position.z);
    }
}