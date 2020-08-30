import * as THREE from "three";
import GameObject from './GameObject';
import Input from './Input';
import Time from './Time';
import Vector3 from './Vector3';
import VehicleManager from './VehicleManager';
import Quaternion from './Quaternion';
import Camera from './Camera';

export default class Player extends GameObject{
    constructor(name = null, meshPath = null, skinnedMesh = false, castShadow = false, recieveShadow = false, flatShading = false, position = Vector3.zero, rotation = Quaternion.Identity()) {
        super(name, meshPath, skinnedMesh, castShadow, recieveShadow, flatShading, position, rotation);
        this.vehicle = null;
    }
    changeAnimation(animation){
        this.moveSpeed = 5.0;
       
        if (this.model !== null)
            this.model.playAnimation(animation);
    }
    update(){

        const ePressed = Input.isKeyPressed('e');
        if (ePressed && this.vehicle === null)
        this.vehicle = VehicleManager.useVehicle();
        else
        if (ePressed && this.vehicle !== null)
        {
            this.vehicle.inUse = false;
           
           let pos = this.vehicle.position;
           Camera.target = this;
           this.vehicle = null;
           this.setPosition(new Vector3(pos.x + 2, 1, pos.z));

        }
       
  
    

        if (this.vehicle !== null && this.vehicle !== 'undefined') {
            this.setPosition(new Vector3(0.0, -100, 0.0));
        
            super.update();
            return;
        }

        if (this.model && this.model.hasOwnProperty('mixer') && this.model.mixer !== null)
            this.model.mixer.timeScale = 1.0;

        let zMove = 0;
        let xMove = 0;
        
        if (Input.isKeyDown('w'))
            zMove = -1;
        
        if (Input.isKeyDown('s'))
            zMove= 1;

        if (Input.isKeyDown('a'))
            xMove = -1;   
        
        if (Input.isKeyDown('d'))
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