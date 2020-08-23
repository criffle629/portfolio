import Camera from './Camera';
import * as THREE from 'three';
import Time from './Time';
import Scene from './Scene';
import Renderer from "./Renderer";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

class PostProcessingManager{
    init(renderer){
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

    isUsingEffects(){
        return this.bokeh || this.bloom || this.fxaa;
    } 
    
    addFXAA(){

        this.ffxa = new ShaderPass( FXAAShader );
        const pixelRatio = (Scene.screenWidth / Scene.screenHeight);
        this.ffxa.uniforms['resolution'].value.x = 1 / (Scene.screenWidth * pixelRatio );
        this.ffxa.uniforms['resolution'].value.y = 1 / (Scene.screenHeight * pixelRatio );

        this.composer.addPass(this.ffxa);
        this.composer.addPass(this.ffxa);
        this.composer.addPass(this.ffxa);
        this.composer.addPass(this.ffxa);
    }

    addBokeh(){ 
     
        this.bokeh  =  new BokehPass(Scene.scene, Camera.mainCamera, {
            focus: 10.0,
            aperture: 1,
            maxBlur: 5,
            width: Scene.screenWidth,
            height: Scene.screenHeight
        });

        this.composer.addPass(this.bokeh)
    }

    addBloom(){
        this.bloom = new UnrealBloomPass(
            new THREE.Vector2(Scene.screenWidth, Scene.screenHeight),
            .5,
            1,
            .8 );
     
        this.composer.addPass(this.bloom)
    }

    render(){ 
        this.renderPass.camera = Camera.mainCamera;
         this.composer.render(Time.deltaTime);
    }
}

const PostProcessing = new PostProcessingManager();

export default PostProcessing;