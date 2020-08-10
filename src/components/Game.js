'use strict';
import React from 'react';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock, Vector3 } from 'three';
import SkinnedMesh from '../engine/SkinnedMesh';
import Mesh from '../engine/Mesh';
import Input from '../engine/Input';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';
import Time from '../engine/Time';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.mixer = null;
        this.renderer = null;
        this.light = null;
        this.skinnedMesh = null;
        this.building = null;
    }

    Load = () => {
        this.renderer = new THREE.WebGLRenderer({canvas:this.canvas, alpha: false, antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.light = new THREE.DirectionalLight(0xffffff, 3);
 
        var d = 5;
        this.light.castShadow = true;
		this.light.shadow.camera.left = - d;
		this.light.shadow.camera.right = d;
		this.light.shadow.camera.top = d;
		this.light.shadow.camera.bottom = - d;
    
		this.light.shadow.camera.near = 0.1;
		this.light.shadow.camera.far = 1000;

		this.light.shadow.mapSize.x = 1024;
		this.light.shadow.mapSize.y = 1024;
        Scene.add(this.light);
        this.target = new THREE.Object3D();
        this.light.target = this.target;

        Scene.add(this.light.target);
    
        this.light.target.translateX(0);
        this.light.target.translateY(-1);
        this.light.target.translateZ(-1);

        this.ambientLight = new THREE.AmbientLight( 0xffffff, .5 ); // soft white light
        Scene.add( this.ambientLight );
        
        this.dir = 1;
        this.skinnedMesh = new SkinnedMesh('./assets/models/chris.glb');

        this.building = new Mesh('./assets/models/garage.glb');
      

        this.lightDir = new THREE.Vector3(0,0, -1);
        this.lightRot = 0;
        requestAnimationFrame(this.Animate);  

    
    }

    Animate = () => {  

        Time.Update();
        console.log(Time.deltaTime)
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
    
      
        moveDir = new THREE.Vector3(    moveDir.x * 20 * Time.deltaTime, 0,   moveDir.z * 20 * Time.deltaTime);
        Camera.Move(moveDir);
     
        this.skinnedMesh.Animate(Time.deltaTime);
        this.renderer.render(Scene.getScene(), Camera.mainCamera);
        requestAnimationFrame(this.Animate);
        

    }

    HandleKeyPress(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.key);
        Input.addKey(e.key);
    }

    HandleKeyUp(e) {
        e.preventDefault(); 
        e.stopPropagation();
        Input.removeKey(e.key);
       
    }

    render() {
        return (
            <canvas tabIndex="0" onKeyDown={this.HandleKeyPress} onKeyUp={this.HandleKeyUp} ref={(c) => {this.canvas = c; this.Load();}}/>
        )
    }
}
