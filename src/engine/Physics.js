import CANNON from 'cannon';
import Vector3 from './Vector3';

class PhysicsEngine{

    static PhysicShapes = {
        SPHERE: 0,
        BOX: 1,
        PLANE: 2,
        CAPSULE: 3,
    };

    constructor(){
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.8, 0);
        this.rigidBodies = [];
    }

    setGravity(v){
        this.world.gravity.set(v.x, v.y, v.z);
    }

    addRigidBody(mass = 1, shape = null, position = Vector3.zero){

        if (shape === null) return;
        let rigidBody = new CANNON.Body({
            mass: mass,
            position: position,
            shape: shape,
        })

        this.rigidBodies.push(rigidBody);
        this.world.addBody(rigidBody);
        return this.rigidBodies[this.rigidBodies.length - 1];
    }

    createSphereShape(radius = 1){
        return new CANNON.Sphere(radius);
    }

    createBoxShape(boxSize){
        return new CANNON.Box(new CANNON.Vec3(boxSize.x, boxSize.y, boxSize.z));
    }

    createPlaneShape(){
        return new CANNON.Plane();
    }
    
    update(){
        this.world.step(1/120);
    }
}

const Physics = new PhysicsEngine();

export default Physics;