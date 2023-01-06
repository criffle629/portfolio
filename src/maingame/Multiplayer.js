import socketIOClient from 'socket.io-client'
import Vector3 from '../engine/Vector3'
import Quaternion from '../engine/Quaternion'
import Player from './Player'
import Physics from '../engine/Physics'
import Time from '../engine/Time'

export class NetPlayer {
  constructor(playerUUID) {
    this.uuid = playerUUID
    this.player = new Player(
      'player',
      null,
      true,
      true,
      true,
      new Vector3(0, 1, 0),
      Quaternion.FromEuler(0, 180, 0),
    )
    this.player.isLocal = false
    this.player
      .LoadModel('player', './assets/models/chris.glb', true)
      .then(() => {
        this.player.addRigidBody(
          {
            friction: 0.25,
            rollingFriction: 0,
            restitution: 0.5,
            mass: 1
          },
          Physics.createCapsuleShape(0.23, 0.48, Vector3.up),
          new Vector3(0, 1, 0),
        )
      })

    this.position = new Vector3(0.0, 0.5, 0);
    this.newPosition = new Vector3(0.0, 0.5, 0.0);
    this.rotation = new Quaternion(0, 0.0, 0, 0.0);
    this.newRotation = new Quaternion(0, 0.0, 0, 0.0);
  }
}

class MultiplayerManager {
  constructor() {
    this.server = 'https://portfolio-server-3pl0.onrender.com';
    //this.server = '127.0.0.1:8000'
    this.uuid = null;
    this.netUpdateRate = 1.0 / 10.0;
    this.netPlayers = new Map();
    this.vehicles = new Map();
    this.connect();
  }

  connect() {
    return new Promise((resolve) => {
      this.socket = socketIOClient(this.server, { transports: ['websocket'], })

      console.log('connect')
      this.socket.on('uuid', (data) => {
        this.uuid = data.uuid
      })

      this.socket.on('updateHost', (data) => {
        this.match = data.match
        this.isHost = true
      })

      this.socket.on('addClient', (data) => {
        if (!this.netPlayers.has(data.uuid) && data.uuid !== this.uuid) {
          this.netPlayers.set(data.uuid, new NetPlayer(data.uuid))
        }
      })

      this.socket.on('removeClient', (data) => {
        let player = this.netPlayers.get(data.uuid)
        player.player.destroyModel()
        this.netPlayers.delete(data.uuid)
      })

      this.socket.on('receiveInput', (data) => { })

      this.socket.on('vehicleNetUpdate', (data) => {
        this.vehicles.get(data.key).netUpdate(data)
      })

      this.socket.on('vehicleExit', (data) => {
        this.vehicles.get(data.vehicle).netVehicleExit()
      })

      this.socket.on('vehicleEnter', (data) => {
        this.vehicles.get(data.vehicle).netVehicleEnter()
      })

      this.socket.on('playerUpdate', (data) => {
        for (let [key, netPlayer] of this.netPlayers) {
          if (data.uuid === netPlayer.uuid) {


            netPlayer.newPosition = data.position;
            netPlayer.newRotation = data.rotation.euler;
          }
        }
      })

      resolve(this.socket)
    })
  }

  sendStateUpdate() {
    this.socket.emit('updateState', {
      matchUUID: this.match.uuid,
      hostUUID: this.match.uuid,
      clients: this.clients,
      ball: this.ball,
    })
  }

  getClients() {
    return this.clients
  }

  updateWithServer(position, rotation) {
    this.socket.emit('updateState', { uuid: this.uuid, position, rotation })
  }

  updateVehicleWithServer(vehicleUpdate) {
    this.socket.emit('updateVehicle', vehicleUpdate)
  }

  enterVehicle(vehicle) {
    this.socket.emit('vehicleEnter', { vehicle: vehicle })
  }

  exitVehicle(vehicle) {
    this.socket.emit('vehicleExit', { vehicle: vehicle })
  }
  addVehicle(key, vehicle) {
    this.vehicles.set(key, vehicle)
  }

  updateInput(input) { }

  update() {
    for (let [key, netPlayer] of this.netPlayers) {

      let dist = Vector3.Distance(netPlayer.position, netPlayer.newPosition);

      if (dist <= 1.0)
        netPlayer.position = Vector3.MoveTowards(netPlayer.position, netPlayer.newPosition, 8.0 * Time.deltaTime);
      else
        netPlayer.position = netPlayer.newPosition;

      netPlayer.rotation = Vector3.MoveTowards(netPlayer.rotation, netPlayer.newRotation, 1.0 * Time.deltaTime);

      netPlayer.player.rotation = netPlayer.rotation;
      netPlayer.player.netMove(netPlayer.position, netPlayer.newRotation);
    }
  }
}

const Multiplayer = new MultiplayerManager()
export default Multiplayer;
