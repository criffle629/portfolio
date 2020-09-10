import * as THREE from "three";

class SceneManager {

    static FOG_TYPE = {
        LINEAR: 0,
        EXPONENTIAL: 1,
    };

    constructor() {
        this.scene = new THREE.Scene();
        this.enabledObjects = {};
        this.disabledObjects = {};
        this.screenWidth = 1024;
        this.screenHeight = 600;
        this.aspectRatio = 1024 / 600;
    }

    add(obj) {
        this.scene.add(obj);
    }

    addGameObject(obj) {

        if (obj.objID in this.disabledObjects)
            this.enableObject(obj);
        else
            if (!(obj.objID in this.enableObject))
                this.enabledObjects[obj.objID] = obj;
    }

    getScene() {
        return this.scene;
    }

    enableObject(obj) {
        if (obj.objID in this.disabledObjects) {
            this.enabledObjects[obj.objID] = obj;
            delete this.disabledObjects[obj.objID];
        }
    }

    disableObject(obj) {
        if (obj.objID in this.enableObjects) {
            this.disabledObjects[obj.objID] = obj;
            delete this.enabledObjects[obj.objID];
        }
    }

    deleteObject(obj){
        const object = this.scene.getObjectByProperty( 'uuid', obj.objID );
    }

    update() {

        for (let obj in this.enabledObjects) {
            this.enabledObjects[obj].update();
        }

        if (this.ball !== undefined && this.ball !== null)
            this.cameraController.ball = this.ball;

        for (let obj in this.enabledObjects) {
            this.enabledObjects[obj].lateUpdate();
        }
        
        for (let obj in this.enabledObjects) {
            this.enabledObjects[obj].render();
        }
    }

    setScreenSize(width, height) {
        this.screenWidth = width;
        this.screenHeight = height;

        this.aspectRatio = width / height;
    }

    setLinearFog(color, near, far) {
        this.scene.fog = new THREE.Fog(color, near, far);
    }

    setExpoFog(color, density) {
        this.scene.fog = new THREE.FogExp2(color, density);
    }
}

const Scene = new SceneManager();

export default Scene;