import { BloomEffect, 
         EffectComposer,
         DepthOfFieldEffect, 
         EffectPass, 
         RenderPass,
         } from "postprocessing";

import Camera from './Camera';

import Time from './Time';
import Scene from './Scene';
import GameEngine from "./GameEngine";

class PostProcessingManager{
    init(renderer){
        this.composer = new EffectComposer(renderer);
        this.renderPass = new RenderPass(Scene.getScene(), Camera.mainCamera);
        this.composer.addPass(this.renderPass);
        this.bokeh = null;
        this.bloom = null;
        this.ssao = null;
        this.renderer = renderer;
    }

    isUsingEffects(){
        return this.bokeh || this.bloom || this.ssao;
    }

    addBokeh(){ 
        this.bokeh  =  new EffectPass(Camera.mainCamera, new DepthOfFieldEffect({
            focusDistance: 1000,
			focalLength: 100.0,
			bokehScale: 5.0,
			height: 1024
        }));
        this.composer.addPass(this.bokeh)
    }

    addBloom(){
        this.bloom  =  new EffectPass(Camera.mainCamera, new BloomEffect());
        this.composer.addPass(this.bloom)
    }

    render(){ 
        this.renderPass.camera = Camera.mainCamera;
         this.composer.render(Time.deltaTime);
    }
}

const PostProcessing = new PostProcessingManager();

export default PostProcessing;