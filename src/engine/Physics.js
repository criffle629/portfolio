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
        this.world.gravity.set(0, -2.8, 0);
        this.world.defaultContactMaterial.friction = 0;
        this.world.defaultContactMaterial.restitution = 0.0;

        this.rigidBodies = [];
    }

    setGravity(v){
        this.world.gravity.set(v.x, v.y, v.z);
    }

    addRigidBody(mass = 1, shape = null, position = Vector3.zero){

        if (shape === null) return;

        if (!Array.isArray(shape)){
        let rigidBody = new CANNON.Body({
            mass: mass,
            position: position,
            shape: shape,
        });

            this.rigidBodies.push(rigidBody);
            this.world.addBody(rigidBody);
            return this.rigidBodies[this.rigidBodies.length - 1];
        }
        else{
            let rigidBody = new CANNON.Body({
                mass: mass,
                position: position,
            });
            
            for (let i = 0; i < shape.length; i++){
                rigidBody.addShape(shape[i]);
            }

            rigidBody.updateMassProperties();
            rigidBody.velocity.set(0,0,0); 
            rigidBody.angularVelocity.set(0,0,0);
            rigidBody.type = CANNON.Body.STATIC;
            this.rigidBodies.push(rigidBody);
            this.world.addBody(rigidBody);
            return this.rigidBodies[this.rigidBodies.length - 1];
        }
        
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
    }

    update(){
        this.world.step(1/60);
    }
}

const Physics = new PhysicsEngine();

export default Physics;