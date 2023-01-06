import Vector3 from './Vector3';
import GameObject from './GameObject';
import Quaternion from './Quaternion';
import Scene from './Scene';
import * as THREE from "three";
import MathTools from './MathTools';
class VideoBillboard {
    constructor(videoPath, name, xSize = 1, ySize = 1, xPos = 0, yPos = 0, zPos = 0, rotX = 0, rotY = 0, rotZ = 0, mesh = null) {

        if (mesh !== null)
        {
            this.MeshBillboard(name, mesh);
            return;
        }

        console.log('old')
         this.gameObject = new GameObject();
         
         this.interval = setInterval(() => {
 

            this.video = document.getElementById(name);
         if (this.video){
          
        this.video.play();

        this.texture = new THREE.VideoTexture( this.video );

        this.geometry1 = new THREE.PlaneGeometry( 3, 3 * (1080.0 / 1920.0));
        // invert the geometry on the x-axis so that all of the faces point inward
        this.geometry1.scale( - 1, 1, 1 );

 
 
        this.material1 = new THREE.MeshBasicMaterial( { map: this.texture } );

        this.mesh1 = new THREE.Mesh( this.geometry1, this.material1 );
        this.mesh1.position.set(xPos, yPos, zPos);
        this.mesh1.rotation.set(rotX * MathTools.deg2Rad, rotY * MathTools.deg2Rad, rotZ * MathTools.deg2Rad);
        
        this.mesh1.doubleSided = true;
        Scene.add( this.mesh1 );
        clearInterval(this.interval);
    }
        }, 100);
         
    }

    MeshBillboard(name, mesh) {

 
        this.mesh = mesh;
        
        this.interval = setInterval(() => {


           this.video = document.getElementById(name);
        if (this.video){
         
       this.video.play();

       this.texture = new THREE.VideoTexture( this.video );
 
 

       this.material1 = new THREE.MeshBasicMaterial( { map: this.texture } );

       this.mesh.children[0].material = this.material1;
 
     
       clearInterval(this.interval);
   }
       }, 100);
        
   }
}

 
export default VideoBillboard; 