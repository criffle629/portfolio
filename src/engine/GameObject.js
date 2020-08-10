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
   
    setRotation(degrees){
        this.rotation = degrees;

        if (this.mesh !== null)
            this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    rotate(degrees){    
        this.rotation = Vector3.add(this.rotation, degrees);

        if (this.mesh !== null)
            this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    setPostion(newPosition){
        this.position = newPosition;

        if (this.mesh !== null)
            this.mesh.translate.position.set(new THREE.Vector3(this.position.x, this.position.y, this.position.z));
    }

    move(pos){
        this.position = Vector3.add(this.position, newPosition);

        if (this.mesh !== null){
            this.mesh.translateX(pos.x);
            this.mesh.translateY(pos.y);
            this.mesh.translateZ(pos.z);
        }
    }

    setScale(newScale){
        this.scale = newScale;
    }

    changeScale(scaleVector){
        this.scale.x += scaleVector.x;
        this.scale.y += scaleVector.y;
        this.scale.z += scaleVector.z;
    }

    update(){


        
    }

    render(){
        if (this.mesh === null)
            return;
            
    }
}