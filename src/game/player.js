import * as THREE from "three";
import GameObject from '../engine/GameObject';
import Input from '../engine/Input';
import Camera from '../engine/Camera';
import Time from '../engine/Time';
import Vector3 from '../engine/Vector3';
import MathTools from '../engine/MathTools';

export default class Player extends GameObject{

    changeAnimation(animation){
        if (this.model !== null)
            this.model.playAnimation(animation);
    }
    update(){
        
        if (this.model.hasOwnProperty('mixer') && this.model.mixer !== null)
            this.model.mixer.timeScale = 2.0;

        let zMove = 0;
        let xMove = 0;
        
        if (Input.isPressed('w'))
            zMove = -1;
        
        if (Input.isPressed('s'))
            zMove= 1;

        if (Input.isPressed('a'))
            xMove = -1;   
        
        if (Input.isPressed('d'))
            xMove = 1;
    
        let moveDir = new THREE.Vector3(xMove, 0, zMove);
        moveDir.normalize();

        if (!Vector3.equals(moveDir, Vector3.zero)){
            this.move(new Vector3(moveDir.x * 5 * Time.deltaTime, 0.0, moveDir.z * 5 * Time.deltaTime));
            this.forward = moveDir;
            this.changeAnimation('Walk');
        }
        else{
            this.changeAnimation('Rest');
        }
       
        const angle = Vector3.angle(Vector3.back, this.forward); 
        this.setRotation(new Vector3(0, angle, 0));

        super.update();
    }

    lateUpdate(){
        const camPos = new THREE.Vector3(this.position.x ,this.position.y + 3, this.position.z + 2);
        Camera.SetPosition(camPos);
        Camera.Rotate(new Vector3(-20.0 * MathTools.deg2Rad , 0 * MathTools.deg2Rad, 0));
    }

    collision(col){
  
     //   col.body.setLinearVelocity(new CANNON.Vec3(0,0,0));
    }
}