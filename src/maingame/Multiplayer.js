import socketIOClient from "socket.io-client";
import Vector3 from '../engine/Vector3';
import Quaternion from '../engine/Quaternion';
import Vehicle from './Vehicle';
import { ConsoleView } from "react-device-detect";
import GameObject from "../engine/GameObject";
import { MapSharp, ThumbUpSharp } from "@material-ui/icons";
import Player from "./Player";
import Physics from "../engine/Physics";
import MathTools from '../engine/MathTools';

export class NetPlayer {
    constructor(playerUUID) {
        this.uuid = playerUUID;
        this.player = new Player('player', null, true, true, true, new Vector3(0, 1, 0), Quaternion.FromEuler(0, 180, 0));
        this.player.isLocal = false;
        this.player.LoadModel('player', './assets/models/chris.glb', true)
            .then(() => {
                this.player.addRigidBody({
                    friction: 0.5,
                    rollingFriction: 0,
                    restitution: 0.5,
                    mass: 1
                }, Physics.createCapsuleShape(0.23, 0.48, Vector3.up), new Vector3(0, 1, 0));
            });

        this.position = new Vector3(0.0, 0.5, 0);
        this.rotation = new Quaternion(0, 0.0, 0, 0.0);
    }

}


class MultiplayerManager {
    constructor() {

      //  this.server = 'https://chrisriffleportfolio-server.herokuapp.com/';
        this.server = '127.0.0.1:8000';
        this.uuid = null;

        this.players = new Map();
        this.vehicles = new Map();
        this.connect();
    }

    connect() {

        return new Promise((resolve) => {
            this.socket = socketIOClient(this.server);
            console.log("connect");
            this.socket.on('uuid', (data) => {
                this.uuid = data.uuid;

            

            });

            this.socket.on('updateHost', (data) => {
                this.match = data.match;
                this.isHost = true;
            });

            this.socket.on('addClient', (data) => {
           
                if (!this.players.has(data.uuid) && data.uuid != this.uuid) {
                this.players.set(data.uuid, new NetPlayer(data.uuid));
       
                }

            });

            this.socket.on('removeClient', (data) => {
               
                let player = this.players.get(data.uuid);
                player.player.destroyModel();
                this.players.delete(data.uuid);
            });

      

            this.socket.on('receiveInput', (data) => {

            });

            this.socket.on('vehicleNetUpdate', (data) => {
                this.vehicles.get(data.key).netUpdate(data);
            });

     
            this.socket.on('vehicleExit', (data) => {
                this.vehicles.get(data.vehicle).netVehicleExit();
         

            });

            this.socket.on('vehicleEnter', (data) => {
                this.vehicles.get(data.vehicle).netVehicleEnter();
             

            });

            this.socket.on('playerUpdate', (data) => {
                
                for (let [key, player] of this.players) {
              
                    if (data.uuid === player.uuid) {
                        let pos = new Vector3(data.position.x, data.position.y, data.position.z);
                        let rot = new Vector3(data.rotation.euler.x,  data.rotation.euler.y,  data.rotation.euler.z);
                     
                        player.player.netMove(pos, rot);
                        player.player.position = data.position;
                        player.player.rotation = data.rotation;
                    }
                }
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

    updateWithServer(position, rotation) {
        this.socket.emit('updateState', { uuid: this.uuid, position, rotation });
    }

    updateVehicleWithServer(vehicleUpdate){

         
        this.socket.emit('updateVehicle', vehicleUpdate);
     }

     enterVehicle(vehicle) {
        this.socket.emit('vehicleEnter', { vehicle: vehicle });
    } 

    exitVehicle(vehicle) {
        this.socket.emit('vehicleExit', { vehicle: vehicle });
    }
    addVehicle(key, vehicle) {
        this.vehicles.set(key, vehicle);
    }

    updateInput(input) {

    }

    update() {


    }
}

const Multiplayer = new MultiplayerManager();
export default Multiplayer;
