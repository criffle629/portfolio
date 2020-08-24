import * as THREE from "three";
import MathTools from './MathTools';
import Ammo from 'ammo.js';

export default class Vector3{
    
    constructor(x = 0.0, y = 0.0 ,z = 0.0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    magnitude(){
        return this.length();
    }

    normalize(){
        let mag = this.magnitude();
        
        if (MathTools.approximate(mag, 0.0)){
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;

            return;
        }

        this.x /= mag;
        this.y /= mag;
        this.z /= mag;
    }

    negate(){
        this.x *= -1.0;
        this.y *= -1.0;
        this.z *= -1.0;
    }

    to3jsV3(){
        return new THREE.Vector3(this.x, this.y, this.z);
    }                   

    to_btVector3(){
        return new Ammo.btVector3(this.x, this.y, this.z);
    }

    toString(){
        return '( x: ' + this.x + '  y: ' + this.y + '  z: ' + this.z + ' )';
    }
    
    static get zero()    { return  new Vector3( 0.0,  0.0,  0.0); }
    static get one()     { return  new Vector3( 1.0,  1.0,  1.0); }
    static get up()      { return  new Vector3( 0.0,  1.0,  0.0); }
    static get down()    { return  new Vector3( 0.0, -1.0,  0.0); }
    static get forward() { return  new Vector3( 0.0,  0.0, -1.0); }
    static get back()    { return  new Vector3( 0.0,  0.0,  1.0); }
    static get left()    { return  new Vector3(-1.0,  0.0,  0.0); }
    static get right()   { return  new Vector3( 1.0,  0.0,  0.0); }
 
    static Add(v1, v2){
        let v = new Vector3(0.0, 0.0, 0.0);
        v.x = v1.x + v2.x;
        v.y = v1.y + v2.y;
        v.z = v1.z + v2.z;

        return v;
    }

    static Subtract(v1, v2){
        let v = new Vector3(0.0, 0.0, 0.0);
        v.x = v1.x - v2.x;
        v.y = v1.y - v2.y;
        v.z = v1.z - v2.z;

        return v;
    }

    static Multiply(v1, v2){
        let v = new Vector3(0.0, 0.0, 0.0);
        v.x = v1.x * v2.x;
        v.y = v1.y * v2.y;
        v.z = v1.z * v2.z;

        return v;
    }


    static AddScalar(v1, scalar){
        let v = new Vector3(0.0, 0.0, 0.0);
        v.x = v1.x + scalar;
        v.y = v1.y + scalar;
        v.z = v1.z + scalar;

        return v;
    }

    static SubtractScalar(v1, scalar){
        let v = new Vector3(0.0, 0.0, 0.0);
        v.x = v1.x - scalar;
        v.y = v1.y - scalar;
        v.z = v1.z - scalar;

        return v;
    }

    static MultiplyScalar(v1, scalar){
        let v = new Vector3(0.0, 0.0, 0.0);
        v.x = v1.x * scalar;
        v.y = v1.y * scalar;
        v.z = v1.z * scalar;

        return v;
    }

    static Cross(v1, v2){
        let v = new Vector3(0.0, 0.0, 0.0);

        v.x = v1.y * v2.z - v1.z * v2.y;
        v.y = v1.z * v2.x - v1.x * v2.z;
        v.z = v1.x * v2.y - v1.y * v2.x;
        
        return v;
    }

    static Distance(v1, v2){
        let delta = Vector3.Subtract(v2 - v1);
    
        let distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y + delta.z * delta.z);
    
        return distance;
    }

    static Dot(v1, v2){
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    
    static Normalize(v1){
        v1.normalize();
        return v1;
    }

    static Equals(v1, v2){
        return (v1.x > v2.x - Number.EPSILON && v1.x < v2.x + Number.EPSILON) &&
               (v1.y > v2.y - Number.EPSILON && v1.y < v2.y + Number.EPSILON) &&
               (v1.z > v2.z - Number.EPSILON && v1.z < v2.z + Number.EPSILON);
    }

    static Angle(v1, v2){
        let cp = Vector3.Cross(v1, v2);

        let angle = Math.atan2(cp.length(), Vector3.Dot(v1, v2));

        return Vector3.Dot(cp, Vector3.up) < 0 ? -angle: angle;
    }

    static Negate(v1){
        let vec = v1;
        vec.x *= -1.0;
        vec.y *= -1.0;
        vec.z *= -1.0;

        return vec;
    }
   
    static toBTV3(v){
        return new Ammo.btVector3(v.x, v.y, v.z);
    }

    static toJSV3(v){
        return new THREE.Vector3(v.x, v.y, v.z);
    }

  
}