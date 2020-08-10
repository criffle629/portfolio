'use strict';
import * as THREE from "three";
import Vector3 from './Vector3';
import MathTools from './MathTools';
import SkinnedMesh from './SkinnedMesh';
import Mesh from './Mesh';
import Scene from './Scene';

export default class GameObject{

    static id = 0;

    constructor(meshPath = null, skinnedMesh = false){
        this.position = new Vector3(0.0, 0.0, 0.0);
        this.rotation = new Vector3(0.0, 0.0, 0.0);
        this.scale = new Vector3(0.0, 0.0, 0.0);
        this.isEnabled = true;
        this.texture = null;
        this.model = null;
        this.skinnedMesh = skinnedMesh;

        this.objID = GameObject.id;

        GameObject.id++;

        if (meshPath !== null)
            this.loadMesh(meshPath, skinnedMesh);

        Scene.addGameObject(this);

    }
   
    setEnabled(value){
        this.isEnabled = value;

        if (this.isEnabled)
            Scene.enableObject(this);
        else
            Scene.disableObject(this);
    }

    loadMesh(meshPath, skinnedMesh){
        if (skinnedMesh)
            this.model = new SkinnedMesh(meshPath);
        else
            this.model = new Mesh(meshPath);
    }
    setRotation(degrees){
        this.rotation = degrees;

        if ( this.model !== null && this.model.mesh !== 'undefined' && this.model.mixer !== null)
            this.model.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    rotate(degrees){    
        this.rotation = Vector3.add(this.rotation, degrees);

        if ( this.model !== null && this.model.mesh !== 'undefined' && this.model.mixer !== null)
            this.model.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    setPosition(newPosition){
        this.position = newPosition;

        
      
    }

    move(pos){
        this.position = Vector3.add(this.position, pos);

        if ( this.model !== null && this.model.mesh !== 'undefined' && this.model.mixer !== null){
            this.model.mesh.translateX(pos.x);
            this.model.mesh.translateY(pos.y);
            this.model.mesh.translateZ(pos.z);
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

        if ( this.model === null || this.model.mesh === 'undefined' || this.model.mixer === null)
            return;
 
        if ( this.model !== null && this.model.mesh !== 'undefined' && this.model.mixer !== null)
            this.model.mesh.position.set(this.position.x, this.position.y, this.position.z);
        
    }

    render(){

        
        if (this.skinnedMesh)
            this.model.Animate();
            
    }
}