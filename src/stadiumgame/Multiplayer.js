import socketIOClient from "socket.io-client";
import Vector3 from '../engine/Vector3';
import Quaternion from '../engine/Quaternion';
import VehicleController from './VehicleController';

const vehicle = {
    isPlayer: false,
    uuid: '',
    breakForce: 25,
    accelForceFront: 100,
    accelForceBack: 100,
    accelRate: 3,
    downForce: -0.35,
    topSpeed: 150,
    bodyWidth: 0.956,
    bodyHeight: 0.738,
    bodyLength: 2.28,
    mass: 100,
    enginePitch: 25,
    position: new Vector3(0.62, 0.56, -9.23),
    rotation: new Quaternion(0, 0.191, 0, 0.982),
    bodyModel: './assets/models/classicbug.glb',
    wheelLeftModel: './assets/models/classicbugwheelLeft.glb',
    wheelRightModel: './assets/models/classicbugwheelRight.glb',
    stiffness: 250.0,
    damping: 15,
    compression: 2.4,
    backFriction: 1,
    frontFriction: 1,
    roll: 0.02,
    radius: 0.2,
    suspensionLen: 0.05,
    backLeftPos: new Vector3(-0.4, -0.35, -0.654),
    backRightPos: new Vector3(0.4, -0.35, -0.654),
    frontRightPos: new Vector3(0.38, -0.35, 0.719),
    frontLeftPos: new Vector3(-0.38, -0.35, 0.719),
};
class MultiplayerManager {
    constructor() {
        this.isHost = false;
        this.server = '127.0.0.1:8000';
        this.uuid = null;
        this.match = null;
        this.clients = [];
        this.clientInput = [];
        this.players = [];
    }

    connect() {
        return;
        return new Promise((resolve) => {
            this.socket = socketIOClient(this.server);

            this.socket.on('uuid', (data) => {
                this.uuid = data.uuid;
                this.isHost = data.host;
                this.match = data.match;
                this.clients = data.match.clients;

                for (let i = 0; i < this.clients.length; i++) {
                    if (this.clients.uuid !== this.uuid) {
                        let vehicleData = vehicle;
                        vehicleData.isPlayer = false;
                        vehicleData.uuid = this.clients[i].uuid;
                        vehicleData.position = new Vector3(this.clients[i].player.position.x, this.clients[i].player.position.y, this.clients[i].player.position.z);
                        vehicleData.rotation = new Quaternion(this.clients[i].player.rotation.x, this.clients[i].player.rotation.y, this.clients[i].player.rotation.z, this.clients[i].player.rotation.w);
                        this.players[data.uuid] = new VehicleController(vehicleData);
                    }
                }
            });

            this.socket.on('updateHost', (data) => {
                this.match = data.match;
                this.isHost = true;
            });

            this.socket.on('addClient', (data) => {
                for (let i = 0; i < this.clients.length; i++) {
                    if (this.clients[i].uuid === data.uuid) {
                        console.log('Attempted to add client that already exists');

                        return;
                    }
                }
                let vehicleData = vehicle;
                vehicleData.isPlayer = false;
                vehicleData.uuid = data.uuid;
                vehicleData.position = new Vector3(data.player.position.x, data.player.position.y, data.player.position.z);
                vehicleData.rotation = new Quaternion(data.player.rotation.x, data.player.rotation.y, data.player.rotation.z, data.player.rotation.w);
                this.players[data.uuid] = new VehicleController(vehicleData);
                this.clients.push(data);
            });

            this.socket.on('removeClient', (data) => {
                for (let i = 0; i < this.clients.length; i++) {
                    if (this.clients[i].uuid === data.uuid) {
                        this.clients.splice(i, 1);
                        this.players.splice(i, 1);
                        return;
                    }
                }

                console.log('Attempted to remove client that does not exist');
            });

            this.socket.on('reveiveInput', (input) => {
            });

            this.socket.on('receiveInput', (data) => {
                if (data.cliendUUID === this.uuid && this.players[data.cliendUUID] !== undefined) return;
                if (Object.keys(data.input.keyboard.keyDown).length !== 0)
                    this.players[data.cliendUUID].input.keyDown = new Map(JSON.parse(data.input.keyboard.keyDown));
                if (Object.keys(data.input.keyboard.keyPressed).length !== 0)
                    this.players[data.cliendUUID].input.keyPressed = new Map(JSON.parse(data.input.keyboard.keyPressed));
                if (Object.keys(data.input.gamepad.buttonsDown).length !== 0)
                    this.players[data.cliendUUID].gamepad.buttonsDown = new Map(JSON.parse(data.input.gamepad.buttonsDown));
                if (Object.keys(data.input.gamepad.buttonsPressed).length !== 0)
                    this.players[data.cliendUUID].gamepad.buttonsPressed = new Map(JSON.parse(data.input.gamepad.buttonsPressed));
                this.players[data.cliendUUID].gamepad.leftAxis = data.input.gamepad.leftAxis;
                this.players[data.cliendUUID].gamepad.rightAxis = data.input.gamepad.rightAxis;
                this.players[data.cliendUUID].gamepad.rightTrigger = data.input.gamepad.rightTrigger;
                this.players[data.cliendUUID].gamepad.leftTrigger = data.input.gamepad.leftTrigger;
            });

            resolve(this.socket);
        });
    }

    sendStateUpdate() {
        this.socket.emit('updateState', { matchUUID: this.match.uuid, hostUUID: this.match.uuid, clients: this.clients, ball: this.ball });
    }

    getClients() {
        return this.clients;
    }

    updateClient(uuid, position, rotation) {
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].uuid === uuid) {
                this.clients[i].player.position = {
                    position: { x: position.x, y: position.y, z: position.z },
                    rotation: { x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w }
                };
                return;
            }
        }
    }

    updateBall(position, rotation) {
        this.ball = {
            position: { x: position.x, y: position.y, z: position.z },
            rotation: { x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w }
        };
    }

    updateInputWithHost(input) {
        if (this.uuid && this.match)
            this.socket.emit('updateInput', { input: input, cliendUUID: this.uuid, matchUUID: this.match.uuid });
    }

    update() { }
}

const Multiplayer = new MultiplayerManager();
export default Multiplayer;
