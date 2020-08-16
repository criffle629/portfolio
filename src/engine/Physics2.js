import Ammo from 'ammo.js';
import Time from './Time';

class PhysicsEngine{

    static PhysicShapes = {
        SPHERE:   0,
        BOX:      1,
        PLANE:    2,
        CAPSULE:  3,
        CYLINDER: 4, 
        CONE:     5,
    };

    constructor(){

        this.collisionConfig      = new Ammo.btDefaultCollisionConfiguration();
        this.dispatcher           = new Ammo.btCollisionDispatcher(this.collisionConfig);
        this.overlappingPairCache = new Ammo.btDbvtBroadphase();
        this.solver               = new Ammo.btSequentialImpulseConstraintSolver();
        this.world                = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.overlappingPairCache, this.solver, this.collisionConfig );

        this.world.setGravity(new Ammo.btVector3(0, -9.8, 0));
        
        this.rigidBodies = [];
    }

    setGravity(v){
        this.world.setGravity(new Ammo.btVector3(v.x, v.y, v.z));
    }
 
    addRigidBody(body){

        if (body === null) return;
        
        body.activate();
        this.world.addRigidBody(body);

   
        this.rigidBodies.push(body);

        return this.rigidBodies[this.rigidBodies.length - 1];
    }

    createSphereShape(radius = 1){
        let shape = new Ammo.btSphereShape(radius);
        shape.setMargin(0.05);

        return shape;
    }

    createBoxShape(boxSize){
        let shape = new Ammo.btBoxShape(new Ammo.btVector3(boxSize.x * 0.5, boxSize.y * 0.5, boxSize.z * 0.5));
        shape.setMargin(0.05);

        return shape;
    }

    createPlaneShape(normal){
        let shape = new Ammo.btPlaneShape(new Ammo.btVector3(normal.x, normal.y, normal.z), 0);
        shape.setMargin(0.05);

        return shape;
    }
    
    createCapsuleShape(radius, height, direction){
        let shape = new Ammo.btCapsuleShape(radius, height, new Ammo.btVector3(direction.x, direction.y, direction.z));
        shape.setMargin(0.05);

        return shape;
    }

    createCylinderShape(radius, height, direction){
        let shape = new Ammo.btCylinderShape(radius, height, new Ammo.btVector3(direction.x, direction.y, direction.z));
        shape.setMargin(0.05);

        return shape;
    }

    createConeShape(radius, height, direction){
        let shape = new Ammo.btConeShape(radius, height, new Ammo.btVector3(direction.x, direction.y, direction.z));
        shape.setMargin(0.05);

        return shape;
    }

    createMeshShape(mesh){
        return new Promise((resolve, reject) => {

            if (mesh === null)
                reject('Mesh is null');
            
            this.parseMesh(mesh)
            .then(shapeMesh => {
                resolve(shapeMesh);
            })
            .catch(e => console.log(e));
        });
    }
 
    parseMesh(mesh){
    /*
        return new Promise( (resolve, reject) => { 
            
        const shapes =  [];
        mesh.forEach( group => {
                if (group.hasOwnProperty('children') && group.children.length > 0){
                     group.children.forEach( mesh => {
                        if (mesh.hasOwnProperty('geometry')){
                            const index = mesh.geometry.index.array;
                            let verts = mesh.geometry.attributes.position.array;
                            
                            let faces = [];
                            for (let i = 0; i < index.length; i += 3){
                                faces.push([index[i], index[i + 1], index[i + 2]]);
                            }

                            let vertsV3 = [];
                            for (let i = 0; i < verts.length; i += 3){
                                vertsV3.push(new CANNON.Vec3(verts[i], verts[i + 1], verts[i + 2]));
                            }
           
                            const convex = new CANNON.ConvexPolyhedron(vertsV3, faces);

                            shapes.push(convex);
                        }
                    });
                }
                else
                if (group.hasOwnProperty('geometry')){
                    const index = group.geometry.index.array;
                    let verts = group.geometry.attributes.position.array;
                    
                    let faces = [];
                    for (let i = 0; i < index.length; i += 3){
                        faces.push([index[i + 2], index[i + 1], index[i ]]);
                    }

                    let vertsV3 = [];
                    for (let i = 0; i < verts.length; i += 3){
                        vertsV3.push(new CANNON.Vec3(verts[i], verts[i + 1], verts[i + 2]));
                    }
   
                    const convex = new CANNON.ConvexPolyhedron(vertsV3, faces);

                    shapes.push(convex);
                }
            });
            resolve(shapes);
        });
        */
    }

    update(){
        this.world.stepSimulation( Time.deltaTime, 10);
    }
}

const Physics = new PhysicsEngine();

export default Physics;