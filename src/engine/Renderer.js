import * as THREE from 'three';

class Renderer {
    constructor() {
        this.renderer = null;
    }

    InitRenderer(canvas, width, height, loopCallback) {

        return new Promise((resolve, reject) => {
            this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: false, antialias: true, precision: 'highp', powerPreference:'high-performance' });
            this.renderer.setSize(width, height);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.cullFace = THREE.CullFaceBack;
            this.renderer.setPixelRatio(window.devicePixelRatio);
     
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.setClearColor('skyblue', 1.0);
    
            this.renderer.setAnimationLoop(loopCallback);
            
            if (this.renderer !== null)
                resolve(this.renderer);
            else
                reject('Error creating renderer');
        });
    }

    Render(scene, camera){
        this.renderer.render(scene, camera);
    }
}

export default Renderer;