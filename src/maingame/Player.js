
import GameObject from '../engine/GameObject';
import Input from '../engine/Input';
import Vector3 from '../engine/Vector3';
import VehicleManager from '../engine/VehicleManager';
import Quaternion from '../engine/Quaternion';
import Camera from '../engine/Camera';
import Vector2 from '../engine/Vector2';
import Gamepad from '../engine/Gamepad';
import Ammo from 'ammo.js';
import MathTools from '../engine/MathTools';
import Time from '../engine/Time';
import Multiplayer from './Multiplayer';

export default class Player extends GameObject {

    constructor(name = null, meshPath = null, skinnedMesh = false, castShadow = false, recieveShadow = false, flatShading = false, position = Vector3.zero, rotation = Quaternion.Identity()) {
        super(name, meshPath, skinnedMesh, castShadow, recieveShadow, flatShading, position, rotation);
        this.vehicle = null;
        this.moveDir = new Vector3(0, 0, 0);
        this.euler = new Vector3(0, 0, 0);
        this.btMoveVec3 = new Ammo.btVector3(0, 0, 0);
        this.isMoving = false;
        this.isLocal = true;
        this.lastPos = this.position;
        this.netAnimTimer = 0;
        this.netTimerTrigger = 0.15;
    }

    changeAnimation(animation) {
        this.moveSpeed = 5.0;

        if (this.model !== null)
            this.model.playAnimation(animation);
    }

    update() {

        this.lastPos = this.position;
        this.isMoving = false;

        if (!this.isLocal) {
            this.netAnimTimer += Time.DeltaTime();

            if (this.netAnimTimer > this.netTimerTrigger){
               
                this.changeAnimation('Rest');
            }
        }
        const ePressed = Input.isKeyPressed('e') || Gamepad.isButtonPressed(Gamepad.Buttons.BUTTON_TOP);
        if (this.isLocal) {
            if (ePressed && this.vehicle === null) {

                this.vehicle = VehicleManager.getInVehicle();
                
                if (this.vehicle !== null) {
                    this.setPosition(new Vector3(0.0, -1000, 0.0));
                    super.update();
                }
            }
            else
                if (ePressed && this.vehicle !== null) {
                    this.vehicle.inUse = false;
                    VehicleManager.leaveVehicle();
                    let pos = this.vehicle.position;
                    Camera.target = this;
                    this.vehicle = null;
                    this.setPosition(pos.set(pos.x + 2, 1, pos.z));

                }
        }
        if (this.vehicle !== null && this.vehicle !== 'undefined')
            return;

        if (this.model && this.model.hasOwnProperty('mixer') && this.model.mixer !== null)
            this.model.mixer.timeScale = 1.0;

        let zMove = 0;
        let xMove = 0;
        if (this.isLocal) {
            if (Input.isKeyDown('w') || Input.isKeyDown('ArrowUp')) {
                zMove = -1;
                this.isMoving = true;
            }

            if (Input.isKeyDown('s') || Input.isKeyDown('ArrowDown')) {
                zMove = 1;
                this.isMoving = true;
            }


            if (Input.isKeyDown('a') || Input.isKeyDown('ArrowLeft')) {
                xMove = -1;
                this.isMoving = true;
            }


            if (Input.isKeyDown('d') || Input.isKeyDown('ArrowRight')) {
                xMove = 1;
                this.isMoving = true;
            }


            //    if (Input.isKeyPressed('l')){
            //        this.model.ragdollActive = !this.model.ragdollActive;
            //        this.model.SetRagdollActive(this.model.ragdollActive);
            //    }

            let stick = Gamepad.leftStick();

            if (!Vector2.Equals(stick, Vector2.zero)) {

                xMove = stick.x;
                zMove = stick.y;
                this.isMoving = true;
            }
        }
        this.moveDir.x = xMove;
        this.moveDir.z = zMove;
        this.moveDir.normalize();
      if (this.isLocal) {

        if (!Vector3.Equals(this.moveDir, Vector3.zero)) {
            this.forward = this.moveDir.normalize();

            this.moveDir.x = this.forward.x;
            this.moveDir.z = this.forward.z;

            this.euler.y = Vector3.Angle(Vector3.back, this.forward);
            this.changeAnimation('Walk');
        }
        else {
            this.changeAnimation('Rest');
        }

  
            
            this.movePlayer();
        }
     
        super.update();
        if  (this.isMoving   && this.isLocal){
            Multiplayer.updateWithServer(this.position, this.rotation);

        }
    }

    movePlayer() {

        if (Camera.controller.fixedCameraMode) {
            this.moveDir.x *= 3;
            this.moveDir.z *= 3;
            const moveVec = new Vector3(this.moveDir.x, this.moveDir.y, this.moveDir.z);
            moveVec.y = this.rigidBody.GetLinearVelocity().y;
            this.btMoveVec3.setValue(moveVec.x, moveVec.y, moveVec.z);
            this.rigidBody.body.setLinearVelocity(this.btMoveVec3);
            this.setRotation(this.euler);
        }
        else {
            this.forward = new Vector3(0, 0, -1);
            let rot = this.rotation.Euler();
            rot.x = 0;
            rot.z = 0;
            rot.y -= this.moveDir.x * 2.0 * Time.deltaTime;
            const quat = Quaternion.FromEuler(rot.x * MathTools.rad2Deg, rot.y * MathTools.rad2Deg, rot.z * MathTools.rad2Deg);
            this.forward.rotate(quat);


            if (this.moveDir.z < 0.15 && this.moveDir.z > 0.0)
                this.moveDir.z = 0;

            if (this.moveDir.z > 0)
                this.moveDir.z = 1.5;
            else
                if (this.moveDir.z < 0)
                    this.moveDir.z = -3;

            let moveVec = new Vector3(this.forward.x, this.forward.y, this.forward.z);
            moveVec = Vector3.MultiplyScalar(moveVec, this.moveDir.z);
            moveVec.y = this.rigidBody.GetLinearVelocity().y;
            this.btMoveVec3.setValue(moveVec.x, moveVec.y, moveVec.z);
            this.rigidBody.body.setLinearVelocity(this.btMoveVec3);
            this.setRotation(rot);

        }
    }

    netMove(pos, rot) {

        if (Vector3.Equals(this.position, pos)) return;
        
        this.netAnimTimer = 0.0;
        this.changeAnimation('Walk');
         this.setPosition(pos);
        this.setRotation(rot);
    }
    collision(col) {
        // Need to implement collision callbacks
    }
}