'use strict';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock, WebGLGeometries } from 'three';
import GameObject from "./GameObject";
import Scene from './Scene';

export default class Mesh extends GameObject{
    constructor(path) {
        super();
        this.mixer = null;
        this.action = null;
        this.LoadMesh(path);
    }

    LoadMesh(path) {

        let loader = new GLTFLoader();

        loader.load(path, (gltf) => {
         
        
            gltf.scene.receiveShadow = true;
            gltf.scene.castShadow = true;

            this.mesh = gltf.scene;
            gltf.scene.translateZ(-50);
            Scene.add(gltf.scene);
            
        }, undefined, function (error) {
            console.error(error);
        });
    }
}
