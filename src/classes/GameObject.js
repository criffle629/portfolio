'use strict';
import * as THREE from "three";
import Vector3 from './Vector3';
import MathTools from './MathTools';

export default class GameObject{

    constructor(){
        this.position = new Vector3(0.0, 0.0, 0.0);
        this.rotation = new Vector3(0.0, 0.0, 0.0);
        this.scale = new Vector3(0.0, 0.0, 0.0);
        this.isEnabled = true;
        this.texture = null;
        this.mesh = null;
    }
   
    setRotation(degrees, axis){
        
        this.rotationå.x = degrees * axis.x;
        this.rotation.y = degrees * axis.y;
        this.rotation.z = degrees * axis.z;
    }

    rotate(degrees, axis){    
        this.rotation.x += degrees * axis.x;
        this.rotation.y += degrees * axis.y;
        this.rotation.z += degrees * axis.z;
    }

    setPostion(newPosition){

        

        if (this.mesh !== null)
            this.mesh.translate.position.set(new THREE.Vector3(this.position.x, this.position.y, this.position.z));
    }

    setScale(newScale){
        this.scale = newScale;
    }

    changeScale(scaleVector){
        this.scale.x += scaleVector.x;
        this.scale.y += scaleVector.y;
        this.scale.z += scaleVector.z;
    }
}