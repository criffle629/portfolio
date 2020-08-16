import Vector3 from './Vector3';
import SkinnedMesh from './SkinnedMesh';
import Mesh from './Mesh';
import Scene from './Scene';
import Physics from "./Physics";
import CANNON from 'cannon';

export default class GameObject{

    static id = 0;

    constructor(meshPath = null, skinnedMesh = false){
        this.position = new Vector3(0.0, 0.0, 0.0);
        this.rotation = new Vector3(0.0, 0.0, 0.0);
        this.scale = new Vector3(0.0, 0.0, 0.0);
        this.isEnabled = true;
        this.texture = null;
        this.model = null;
        this.skinnedMesh = skinnedMesh;
        this.forward = Vector3.forward;
        this.objID = GameObject.id;
        this.rigidBody = null;
        GameObject.id++;

        this.LoadModel(meshPath);
    }
   
    LoadModel(meshPath){

        if (meshPath === null) return; 
        
        this.loadMesh(meshPath, this.skinnedMesh)
        .then(data => {
            this.model = data;
        })
        .catch(e => {
            console.log(e);
        });
        Scene.addGameObject(this);
    }


    async loadMesh(meshPath, skinnedMesh){

        return new Promise((resolve, reject) => {
            if (skinnedMesh){
            this.model =  new SkinnedMesh(meshPath);
                resolve(this.model);
            }
            else
            {
                this.model =  new Mesh();
                this.model.LoadMesh(meshPath)
                .then(data => {
                    resolve(data);
                })
                .catch(e => {
                    reject(e);
                });
            }
        });
    
    }


    setEnabled(value){
        this.isEnabled = value;

        if (this.isEnabled)
            Scene.enableObject(this);
        else
            Scene.disableObject(this);
    }

    setRotation(degrees){
        this.rotation = degrees;

        if (this.rigidBody !== null)
            this.rigidBody.quaternion.setFromEuler(degrees.x, degrees.y, degrees.z);
       
    }

    rotate(degrees){           
        if (this.rigidBody !== null){
            const euler = new CANNON.Vec3(0,0,0);
            this.rigidBody.quaternion.toEuler(euler);
            
            this.rotation = Vector3.add(degrees, new Vector3(euler.x, euler.y, euler.z));
            this.rigidBody.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
        }
        else
            this.rotation = Vector3.add(this.rotation, degrees);
    }

    setPosition(newPosition){
        this.position = newPosition;

        if (this.rigidBody !== null)
            this.rigidBody.position = new CANNON.Vec3(newPosition.x, newPosition.y, newPosition.z);

    }

    move(pos){
        if (this.rigidBody !== null){
            const rigidPos = this.rigidBody.position;
            this.rigidBody.position = new CANNON.Vec3(rigidPos.x + pos.x, rigidPos.y + pos.y, rigidPos.z + pos.z);;
            this.position = this.rigidBody.position;
        }
        else
            this.position = Vector3.add(this.position, pos);
    }

    setScale(newScale){
        this.scale = newScale;
    }

    changeScale(scaleVector){
        this.scale.x += scaleVector.x;
        this.scale.y += scaleVector.y;
        this.scale.z += scaleVector.z;
    }

    update(){

        if ( (this.model === null || !this.model.hasOwnProperty('mesh'))  )
            return;

        if (this.model.mesh === null)
            return;
            
        if (this.rigidBody !== null){
         
            const euler = new CANNON.Vec3(0,0,0);
            this.rigidBody.quaternion.toEuler(euler);
            this.model.mesh.position.set(this.rigidBody.position.x, this.rigidBody.position.y, this.rigidBody.position.z);
            this.model.mesh.rotation.set(euler.x, euler.y, euler.z);

        }
        else{
            this.model.mesh.position.set(this.position.x, this.position.y, this.position.z);
            this.model.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        }
        
        
    }

    addRigidBody(mass = 1, shape = null, position = Vector3.zero){
        this.rigidBody = Physics.addRigidBody(mass, shape, position);
        this.rigidBody.addEventListener('collide', this.collision);
    }

    render(){
        if (this.skinnedMesh)
            this.model.Animate();
    }

    collision(col){
        //console.log(col);
    }
}