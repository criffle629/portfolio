import Mesh from './Mesh';
import SkinnedMesh from './SkinnedMesh';

class ContentManager{
    constructor(){
        this.meshes = {};
        this.sounds = {};
    }

    LoadMesh = (name = null, path = null, skinnedMesh = false, castShadow = false, recieveShadow = false, flatShading = false) => {
        if (name === null) console.log('LoadMesh requires name');
        if (path === null) console.log('LoadMesh requires a path');

        return new Promise((resolve, reject) => {

            if (skinnedMesh) {
                let model = new SkinnedMesh(path, castShadow, recieveShadow, flatShading);
                this.meshes[name] = model;
                resolve(model);
            }
            else {
                let model = new Mesh(null, castShadow, recieveShadow, flatShading);
                model.LoadMesh(path)
                    .then(data => {
                        this.meshes[name] = model;
                        resolve(model);
                    })
                    .catch(e => {
                        reject(e);
                    });
                }
        });
    }
}

const Content = new ContentManager();
Object.freeze(Content);

export default Content;