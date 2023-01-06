import Camera from './Camera';
import * as THREE from 'three';
import Time from './Time';
import Scene from './Scene';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { BokehShader } from 'three/examples/jsm//shaders/BokehShader2.js';
import { BokehDepthShader } from 'three/examples/jsm//shaders/BokehShader2.js';

import Vector3 from './Vector3';

class PostProcessingManager {
    init(renderer) {
        this.composer = new EffectComposer(renderer);
        this.renderPass = new RenderPass(Scene.getScene(), Camera.mainCamera);
        this.renderPass.clearColor = new THREE.Color('skyblue');
        this.renderPass.clearAlpha = 1;

        this.composer.addPass(this.renderPass);

        this.bokeh = null;
        this.bloom = null;
        this.ffxa = null;

        this.renderer = renderer;
    }

    isUsingEffects() {
        return this.bokeh || this.bloom || this.fxaa;
    }

    addFXAA() {
        this.ffxa = new ShaderPass(FXAAShader);
        this.ffxa.uniforms['resolution'].value.set(1 / Scene.screenWidth, 1 / Scene.screenHeight);
        this.composer.addPass(this.ffxa);
    }

    addBokeh() {
        this.bokeh = new BokehPass(Scene.scene, Camera.mainCamera, {
            focus: 0.75,
            aperture: 0.04,
            maxblur: 0.01,

            width: Scene.width,
            height: Scene.height
        });
        this.composer.addPass(this.bokeh);
    }

    addBloom() {
        this.bloom = new UnrealBloomPass(
            new THREE.Vector2(Scene.screenWidth, Scene.screenHeight),
            0.35,
            0.4,
            0.85);

        this.composer.addPass(this.bloom)
    }

    render() {
        this.renderPass.camera = Camera.mainCamera;
        this.composer.render(Time.deltaTime);
    }
}

const PostProcessing = new PostProcessingManager();

export default PostProcessing;