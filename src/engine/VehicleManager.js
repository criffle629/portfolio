import Vector3 from './Vector3';
import GameObject from './GameObject';
import Quaternion from './Quaternion';
import Camera from './Camera';
import MathTools from './MathTools';

class VehicleController {
    constructor() {
        this.vehicles = [];
        this.distFromVehicle = 3;
        this.isReady = false;

        this.ekey = new GameObject('ekey', null, false, false, true, true, new Vector3(-23.75, 2, -10), Quaternion.Identity());
        this.rkey = new GameObject('rkey', null, false, false, true, true, new Vector3(-23.75, 2, -10), Quaternion.Identity());

        this.ekey.LoadModel('ekey', './assets/models/ekey.glb', true)
            .then(() => {
                this.ekey.model.mesh.visible = false;
            
            });
            this.rkey.LoadModel('rkey', './assets/models/rkey.glb', true)
            .then(() => {
                this.isReady = true;
                this.rkey.model.mesh.visible = false;
            });
        this.inRangeVehicle = null;
        this.vehicleInUse = null;
    }

    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }

    useVehicle(player) {
        if (this.inRangeVehicle === null) return null;

        this.inRangeVehicle.inUse = true;
        Camera.target = this.inRangeVehicle;
        this.vehicleInUse = this.inRangeVehicle;

        return this.inRangeVehicle;
    }

    controllVehicle(vehicle) {
        if (vehicle === null) return null;

        vehicle.inUse = true;
        Camera.target = vehicle;
        this.vehicleInUse = vehicle;

        return vehicle;
    }

    leaveVehicle(){
        this.vehicleInUse = null;
    }

    updateEKey(){
        if (this.inRangeVehicle !== null) {

            let vehiclePos = this.inRangeVehicle.position;
            this.ekey.setPosition(new Vector3(vehiclePos.x, vehiclePos.y + 1, vehiclePos.z));
            this.ekey.model.mesh.visible = true;
        }
        else {
            this.ekey.model.mesh.visible = false;
        }

        if (this.ekey.model.mesh.visible) {
            let camPos = new Vector3(Camera.position.x, 0, Camera.position.z);
            let eKeyPos = new Vector3(this.ekey.position.x, 0, this.ekey.position.z);
            let lookAt = Quaternion.LookRotation(Vector3.Subtract(camPos, eKeyPos), Vector3.up);
            this.ekey.setRotation(Vector3.MultiplyScalar(lookAt.Euler(), MathTools.deg2Rad));
        }
    }

    updateRKey(){
        if (this.vehicleInUse !== null) {

            if (this.vehicleInUse.inUse && this.vehicleInUse.isUpsideDown()) {
                let vehiclePos = this.vehicleInUse.position;
                vehiclePos.y += 1;
                this.rkey.setPosition(vehiclePos);
                this.rkey.model.mesh.visible = true;
            }
            else {
                this.rkey.model.mesh.visible = false;
            }
        }
        else{
            this.rkey.model.mesh.visible = false;
        }
    }

    findInRangeVehicle(pos){
        this.inRangeVehicle = null;
        let closest = this.distFromVehicle + 1;

        for (let i = 0; i < this.vehicles.length; i++) {
            let vehiclePos = this.vehicles[i].position;

            const dist = Vector3.Distance(pos, vehiclePos);
            if (dist < closest && dist <= 3 && !this.vehicles[i].inUse) {
                closest = dist;
                this.inRangeVehicle = this.vehicles[i];
            }
        }
    }
    
    checkVehicleInRange(pos) {
        if (!this.isReady) return;

        this.findInRangeVehicle(pos);
        this.updateEKey();
        this.updateRKey();
    }
}

const VehicleManager = new VehicleController();
export default VehicleManager; 