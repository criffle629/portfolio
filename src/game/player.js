import * as THREE from "three";
import SkinnedMesh from '../engine/SkinnedMesh';
import GameObject from '../engine/GameObject';
import Input from '../engine/Input';
import Camera from '../engine/Camera';
import Time from '../engine/Time';
import Vector3 from '../engine/Vector3';
import MathTools from '../engine/MathTools';
import { OneMinusDstAlphaFactor } from "three";

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
            this.forward = moveDir;
            this.changeAnimation('Walk');
        }
        else{
            this.changeAnimation('Rest');
        }
       
        const angle = Vector3.angle(Vector3.back, this.forward); 

        this.setRotation(Vector3.zero);
        this.move(new Vector3(moveDir.x * 5 * Time.deltaTime, 0.0, moveDir.z * 5 * Time.deltaTime));

        this.setRotation(new Vector3(0.0, angle  , 0.0));

        const camPos = new THREE.Vector3(this.position.x , 5, this.position.z + 15);
        Camera.SetPosition(camPos);
        Camera.Rotate(new Vector3(-40.0 * MathTools.deg2Rad , 0, 0));
    
 
    }
}