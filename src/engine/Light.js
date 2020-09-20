import * as THREE from 'three';
import GameObject from './GameObject';
import Scene from './Scene';
import Camera from './Camera';
import { Vector3 } from 'three';
import MathTools from './MathTools';

export default class Light extends GameObject {

    static LightType = {
        DIRECTIONAL: 0,
        POINT: 1,
        SPOT: 2,
        AMBIENT: 3,
    }

    constructor(options = { lightType: Light.LightType.DirectionalLight, 
                            color: 0xffffff, 
                            intensity: 1, 
                            castShadow: true, 
                            shadowMapWidth: 2048, 
                            shadowMapHeight: 2048, 
                            cameraNear: 0.1, 
                            cameraFar: 50, 
                            shadowBias: -0.00025, 
                            shadowCameraSize: 50,
                            target: new Vector3(0 , -1, 0),
                            position: new Vector3(0, 1, 0),
                            distance: 100,
                            decay: 2,
                            angle: 30 * MathTools.deg2Rad,
                            penumbra: 0.03
                            }) {
        super();
        this.options = options;
        this.light = null;

        if (this.options.position === undefined)
            this.options.position = new Vector3(0, 1, 0);

        switch (options.lightType) {
            case Light.LightType.DIRECTIONAL:
                this.createDirectionalLight();
                break;
            case Light.LightType.POINT:
                this.createPointLight();
                break;
            case Light.LightType.SPOT:
                this.createSpotLight();
                break;
            case Light.LightType.AMBIENT:
                this.createAmbientLight();
                break;
            default:
                console.log('Unknown light type')
        }
    }

    createDirectionalLight() {
        this.light = new THREE.DirectionalLight(this.options.color, this.options.intensity);

        if (this.options.castShadow)
            this.enableShadows();

        this.light.target = new THREE.Object3D();

        Scene.add(this.light.target);
        Scene.add(this.light);
    }

    createAmbientLight() {
        this.light = new THREE.AmbientLight(this.options.color, this.options.intensity);
        Scene.add(this.light);
    }

    createPointLight(){
        this.light = new THREE.PointLight(this.position.color, this.options.intensity, this.options.distance);
        this.light.decay = this.options.decay;
        const pos = this.options.position;
        this.light.position.set(pos.x, pos.y, pos.z);

        if (this.options.castShadow)
            this.enableShadows();

        Scene.add(this.light);
    }	 
    createSpotLight(){
        this.light = new THREE.SpotLight(this.options.color, this.options.intensity, this.options.distance, this.options.angle, this.options.penumbra, this.options.decay);

        const pos = this.options.position;
        const target = this.options.target;
        
        this.light.position.set(pos.x, pos.y, pos.z);
        
        this.light.target.position.set(target.x, target.y, target.z);
        
        if (this.options.castShadow)
            this.enableShadows();
            
        Scene.add(this.light.target);
        Scene.add(this.light);
    }

    enableShadows(){
        this.light.castShadow = this.options.castShadow;

        this.light.shadow.mapSize.width = this.options.shadowMapWidth;
        this.light.shadow.mapSize.height = this.options.shadowMapHeight;
        this.light.shadow.camera.near = this.options.cameraNear;
        this.light.shadow.camera.far = this.options.cameraFar;
        this.light.shadow.bias = this.options.shadowBias;

        this.light.shadow.camera.top = this.options.shadowCameraSize;
        this.light.shadow.camera.bottom = -this.options.shadowCameraSize;
        this.light.shadow.camera.left = -this.options.shadowCameraSize;
        this.light.shadow.camera.right = this.options.shadowCameraSize;
    }

    update() {
        if (this.light === null) return;

        if (this.options.lightType === Light.LightType.DIRECTIONAL) {
            const camPos = Camera.position;
            this.light.position.set(camPos.x, 1, camPos.z + 5);
            this.light.target.position.set(this.options.target.x + camPos.x, this.options.target.y, this.options.target.z + camPos.z);
        }
        else
        if(this.options.lightType === Light.LightType.SPOT){
            this.light.position.set(this.options.position.x, this.options.position.y, this.options.position.z);
            this.light.target.position.set(this.options.target.x , this.options.target.y, this.options.target.z);
        }
    }
}