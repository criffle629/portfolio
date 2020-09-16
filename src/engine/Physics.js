import Time from './Time';
import Ammo from 'ammo.js';
import GameEngine from './GameEngine';

class PhysicsEngine {

    static PhysicShapes = {
        SPHERE: 0,
        BOX: 1,
        PLANE: 2,
        CAPSULE: 3,
        CYLINDER: 4,
        CONE: 5,
    };

    constructor() {
        this.collisionConfig = new Ammo.btDefaultCollisionConfiguration();
        this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfig);
        this.broadphase = new Ammo.btDbvtBroadphase();
        this.solver = new Ammo.btSequentialImpulseConstraintSolver();
        this.world = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfig);

        this.world.setGravity(new Ammo.btVector3(0, -9.8, 0));

        this.rigidBodies = [];
    }

    setGravity(v) {
        this.world.setGravity(new Ammo.btVector3(v.x, v.y, v.z));
    }

    addRigidBody(body) {

        if (body === null) return;

        this.world.addRigidBody(body);
        this.rigidBodies.push(body);

        return this.rigidBodies[this.rigidBodies.length - 1];
    }

    removeRigidBody(body){
        this.world.removeRigidBody(body);
    }
    
    createSphereShape(radius = 1) {
        let shape = new Ammo.btSphereShape(radius);
        shape.setMargin(0.05);

        return shape;
    }

    createBoxShape(boxSize) {
        let shape = new Ammo.btBoxShape(new Ammo.btVector3(boxSize.x * 0.5, boxSize.y * 0.5, boxSize.z * 0.5));
        
        return shape;
    }

    createPlaneShape(normal) {
        let shape = new Ammo.btStaticPlaneShape(new Ammo.btVector3(normal.x, normal.y, normal.z), 0.0001);

        return shape;
    }

    createCapsuleShape(radius, height, direction) {
        let shape = new Ammo.btCapsuleShape(radius, height, new Ammo.btVector3(direction.x, direction.y, direction.z));
        shape.setMargin(0.05);

        return shape;
    }

    createCylinderShape(radius, height, direction) {
        let shape = new Ammo.btCylinderShape(radius, height, new Ammo.btVector3(direction.x, direction.y, direction.z));
        shape.setMargin(0.05);

        return shape;
    }

    createConeShape(radius, height, direction) {
        let shape = new Ammo.btConeShape(radius, height, new Ammo.btVector3(direction.x, direction.y, direction.z));
        shape.setMargin(0.05);

        return shape;
    }

    createMeshShape(mesh) {
        return new Promise((resolve, reject) => {

            let vertsV3 = [];
            let indices = [];

            mesh.children.forEach(group => {
                if (group.hasOwnProperty('children') && group.children.length > 0) {
                    group.children.forEach(mesh => {
                        if (mesh.hasOwnProperty('geometry')) {
                            let index = mesh.geometry.index.array;
                            let verts = mesh.geometry.attributes.position.array;
                            // This code wont work.  Will create a garbage collision mesh.
                            for (let i = 0; i < index.length; i += 3) {
                                indices.push(index[i]);
                            }

                            for (let i = 0; i < verts.length; i += 3) {
                                vertsV3.push(new Ammo.btVector3(verts[i], verts[i + 1], verts[i + 2]));
                            }
                        }
                    });
                }
                else
                    if (group.hasOwnProperty('geometry')) {
                        indices = group.geometry.index.array;
                        let verts = group.geometry.attributes.position.array;

                        for (let i = 0; i < verts.length; i += 3) {
                            vertsV3.push(new Ammo.btVector3(verts[i], verts[i + 1], verts[i + 2]));
                        }
                    }
            });

            let triMesh = new Ammo.btTriangleMesh();

            for (let i = 0; i < indices.length; i += 3) {

                triMesh.addTriangle(vertsV3[indices[i]], vertsV3[indices[i + 1]], vertsV3[indices[i + 2]]);
            }

            const shape = new Ammo.btBvhTriangleMeshShape(triMesh, true);

            resolve(shape);
        });
    }

    update() {
        // Using fixed time step based off of frame rate.  This seems very hacky but gives a fairly stable simulation
        if (Time.physicsRate === Infinity) Time.physicsRate = 0;
        this.world.stepSimulation( 1 / 60,Time.physicsRate, 10);
    }
}

const Physics = new PhysicsEngine();
export default Physics;