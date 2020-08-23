import * as THREE from "three";
import GameObject from '../engine/GameObject';
import Input from '../engine/Input';
import Time from '../engine/Time';
import Vector3 from '../engine/Vector3';


export default class Player extends GameObject{

    changeAnimation(animation){
        this.moveSpeed       = 5.0;
   
        if (this.model !== null)
            this.model.playAnimation(animation);
    }
    update(){
        
        if (this.model && this.model.hasOwnProperty('mixer') && this.model.mixer !== null)
            this.model.mixer.timeScale = 1.0;

        
        let zMove = 0;
        let xMove = 0;
        
        if (Input.isPressed('w') || Input.isPressed('W'))
            zMove = -1;
        
        if (Input.isPressed('s') || Input.isPressed('S'))
            zMove= 1;

        if (Input.isPressed('a') || Input.isPressed('A'))
            xMove = -1;   
        
        if (Input.isPressed('d') || Input.isPressed('D'))
            xMove = 1;
    
        let moveDir = new THREE.Vector3(xMove, 0, zMove);
        moveDir.normalize();

        if (!Vector3.Equals(moveDir, Vector3.zero)){
            this.forward = moveDir.normalize();
            this.move(new Vector3(this.forward.x * 3 * Time.deltaTime, 0.0, this.forward.z * 3 * Time.deltaTime));
            
            this.changeAnimation('Walk');
        }
        else{
            this.changeAnimation('Rest');
        }
        const angle = Vector3.Angle(Vector3.back, this.forward); 
    
        this.setRotation(new Vector3(0, angle  , 0));

        super.update();
    }

    lateUpdate(){
     //   const camPos = new THREE.Vector3(this.position.x ,this.position.y + 3.0, this.position.z + 4.0);
     //   Camera.SetPosition(camPos);
     //   Camera.Rotate(new Vector3(-30.0 * MathTools.deg2Rad , 0 * MathTools.deg2Rad, 0));
    }

    collision(col){
  
     //   col.body.setLinearVelocity(new CANNON.Vec3(0,0,0));
    }
}