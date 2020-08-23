import * as THREE from "three";
import Camera from './Camera';

class AudioManager {
    constructor() {
        this.listener = new THREE.AudioListener();
        Camera.mainCamera.add(this.listener);
    }

    LoadSound(path, loop = false, volume = 0.5) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.AudioLoader();
            let sound = new THREE.PositionalAudio(this.listener);
 
            try {
            loader.load(path, (buffer) => {

                if (buffer === null) reject('Error loading sound');

                sound.setBuffer(buffer);
                sound.setLoop(loop);
                sound.setVolume(volume);
                sound.setRefDistance(20);

                resolve(sound);
            });
        }
        catch(e){
            resolve(e);
        }
        });
    }
}

const Audio = new AudioManager();
Object.freeze(Audio);
export default Audio;