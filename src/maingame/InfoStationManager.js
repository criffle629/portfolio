import Vector3 from '../engine/Vector3';
import GameEngine from '../engine/GameEngine';
import Input from '../engine/Input';

class InfoStationsController {
    constructor() {
        this.infoStations = [];
        this.activationDistance = 0.75;
        this.inUse = false;
    }

    addInfoStation(position, stationName) {
        this.infoStations.push({ position: position, name: stationName });
    }

    update(pos) {
        let activate = false;
        let openModal = '';
        let closestDistance = 10;

        for (let i = 0; i < this.infoStations.length; i++) {
            const dist = Vector3.Distance(this.infoStations[i].position, pos);

            if (dist < closestDistance) closestDistance = dist;

            if (dist <= this.activationDistance && !this.inUse) {
                this.inUse = true;
                activate = true;
                openModal = this.infoStations[i].name;
                break;
            }
        }

        if (closestDistance > this.activationDistance)
            this.inUse = false;

        if (activate) {
            Input.clearKeys();
            GameEngine.openModal(openModal);
        }
    }
}

const InfoStationManager = new InfoStationsController();

export default InfoStationManager; 