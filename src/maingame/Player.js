
import GameObject from '../engine/GameObject';
import Input from '../engine/Input';
import Vector3 from '../engine/Vector3';
import VehicleManager from '../engine/VehicleManager';
import Quaternion from '../engine/Quaternion';
import Camera from '../engine/Camera';
import Vector2 from '../engine/Vector2';
import Gamepad from '../engine/Gamepad';
import Ammo from 'ammo.js';

export default class Player extends GameObject {

    constructor(name = null, meshPath = null, skinnedMesh = false, castShadow = false, recieveShadow = false, flatShading = false, position = Vector3.zero, rotation = Quaternion.Identity()) {
        super(name, meshPath, skinnedMesh, castShadow, recieveShadow, flatShading, position, rotation);
        this.vehicle = null;
        this.moveDir = new Vector3(0, 0, 0);
        this.euler = new Vector3(0, 0, 0);
        this.btMoveVec3 = new Ammo.btVector3(0, 0, 0);
    }

    changeAnimation(animation) {
        this.moveSpeed = 5.0;

        if (this.model !== null)
            this.model.playAnimation(animation);
    }

    update() {

        const ePressed = Input.isKeyPressed('e') || Gamepad.isButtonPressed(Gamepad.Buttons.BUTTON_TOP);
        if (ePressed && this.vehicle === null)
            this.vehicle = VehicleManager.useVehicle();
        else
            if (ePressed && this.vehicle !== null) {
                this.vehicle.inUse = false;
                VehicleManager.leaveVehicle();
                let pos = this.vehicle.position;
                Camera.target = this;
                this.vehicle = null;
                this.setPosition(pos.set(pos.x + 2, 1, pos.z));

            }

        if (this.vehicle !== null && this.vehicle !== 'undefined' && this.position.y > -90) {
            this.setPosition(new Vector3(0.0, -100, 0.0));

            super.update();
            return;
        }

        if (this.model && this.model.hasOwnProperty('mixer') && this.model.mixer !== null)
            this.model.mixer.timeScale = 1.0;

        let zMove = 0;
        let xMove = 0;

        if (Input.isKeyDown('w') || Input.isKeyDown('ArrowUp'))
            zMove = -1;

        if (Input.isKeyDown('s') || Input.isKeyDown('ArrowDown'))
            zMove = 1;

        if (Input.isKeyDown('a') || Input.isKeyDown('ArrowLeft'))
            xMove = -1;

        if (Input.isKeyDown('d') || Input.isKeyDown('ArrowRight'))
            xMove = 1;

    //    if (Input.isKeyPressed('l')){
    //        this.model.ragdollActive = !this.model.ragdollActive;
    //        this.model.SetRagdollActive(this.model.ragdollActive);
    //    }

        let stick = Gamepad.leftStick();

        if (!Vector2.Equals(stick, Vector2.zero)) {
     
            xMove = stick.x;
            zMove = stick.y;
        }

        this.moveDir.x = xMove ;
        this.moveDir.z = zMove ;
        this.moveDir.normalize();
        
        if (!Vector3.Equals(this.moveDir, Vector3.zero)) {
            this.forward = this.moveDir.normalize();
       
            this.moveDir.x = this.forward.x * 3 ;
            this.moveDir.z = this.forward.z * 3 ;
            
            this.euler.y = Vector3.Angle(Vector3.back, this.forward);
            this.changeAnimation('Walk');
        }
        else {
            this.changeAnimation('Rest');
        }
        
        this.movePlayer();
        this.setRotation(this.euler);

        super.update();
    }

    movePlayer() {
        const moveVec = new Vector3(this.moveDir.x, this.moveDir.y, this.moveDir.z);
        moveVec.y = this.rigidBody.GetLinearVelocity().y;
        this.btMoveVec3.setValue(moveVec.x, moveVec.y, moveVec.z);
        this.rigidBody.body.setLinearVelocity(this.btMoveVec3);
    }

    collision(col) {
        // Need to implement collision callbacks
    }
}