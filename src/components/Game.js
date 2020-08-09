'use strict';
import React from 'react';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock, Vector3 } from 'three';
import SkinnedMesh from '../classes/SkinnedMesh';
import Mesh from '../classes/Mesh';
import Input from '../classes/Input';
import Scene from '../classes/Scene';
import Camera from '../classes/Camera';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.mixer = null;
        this.renderer = null;
        this.clock = null;
        this.light = null;
        this.skinnedMesh = null;
        this.building = null;
    }

    Load = () => {
        this.clock = new Clock(true);
        
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
        this.skinnedMesh = new SkinnedMesh('./assets/models/chris.glb', this.clock, Scene);

        this.building = new Mesh('./assets/models/garage.glb', this.clock, Scene);
      

        this.lightDir = new THREE.Vector3(0,0, -1);
        this.lightRot = 0;
        requestAnimationFrame(this.Animate);  

    
    }

    Animate = () => {  

        let move = new THREE.Vector3(0,0,0);

        if (Input.isPressed('w'))
            move.z = -1 * 5.0 * this.clock.getDelta();
            if (Input.isPressed('s'))
            move.z = 1 * 5.0 * this.clock.getDelta();
            if (Input.isPressed('a'))
            move.x = -1 * 5.0 * this.clock.getDelta();   
            if (Input.isPressed('d'))
            move.x = 1 * 5.0 * this.clock.getDelta();
        Camera.Move(move);
        console.log(Input.isPressed('w'));
        this.skinnedMesh.Animate(this.clock.getDelta());
        this.renderer.render(Scene.getScene(), Camera.mainCamera);
        requestAnimationFrame(this.Animate);

    }

    HandleKeyPress(e) {
        //  console.log(e.key);
        Input.addKey(e.key);
    }

    HandleKeyUp(e) {
        Input.removeKey(e.key);
        console.log(e.key);
    }

    render() {
        return (
            <canvas tabIndex="0" onKeyPress={this.HandleKeyPress} onKeyUp={this.HandleKeyUp} ref={(c) => {this.canvas = c; this.Load();}}/>
        )
    }
}
