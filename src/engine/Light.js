import * as THREE from 'three';
import GameObject from './GameObject';
import Scene from './Scene';
import Camera from './Camera';

export default class Light extends GameObject {

    static LightType = {
        DIRECTIONAL: 0,
        POINT: 1,
        SPOT: 2,
        AMBIENT: 3,
    }

    constructor(options) {
        super();
        this.options = options;

        switch (options.lightType) {
            case Light.LightType.DIRECTIONAL:
                this.createDirectionalLight();
                break;
            case Light.LightType.POINT:
                break;
            case Light.LightType.SPOT:
                break;
            case Light.LightType.AMBIENT:
                this.createAmbientLight();
                break;
            default:
                console.log('Unkown light type')
        }
    }

    createDirectionalLight() {
        this.light = new THREE.DirectionalLight(this.options.color, this.options.intensity);

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

        this.light.target = new THREE.Object3D();

        Scene.add(this.light.target);
        Scene.add(this.light);
    }

    createAmbientLight() {
        this.light = new THREE.AmbientLight(this.options.color, this.options.intensity);
        Scene.add(this.light);
    }

    update() {
        if (this.options.lightType === Light.LightType.DIRECTIONAL) {
            const camPos = Camera.position;
            this.light.position.set(camPos.x, 1, camPos.z + 5);
            this.light.target.position.set(this.options.target.x + camPos.x, this.options.target.y, this.options.target.z + camPos.z);
        }
    }
}