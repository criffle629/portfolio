import socketIOClient from "socket.io-client";

class MultiplayerManager {
    constructor() {
        this.isHost = false;
        this.server = '127.0.0.1:8000';
        this.socket = socketIOClient(this.server);
        this.uuid = null;
        this.match = null;

        this.socket.on('uuid', (socket) => {
            this.connection(socket)
            this.uuid = socket.uuid;
            this.isHost = socket.host;
            this.match = socket.match;
        });

        this.socket.on('updateHost', (socket) => {
            this.match = socket.match;
        });

    }

    connection(socket) {
        console.log(socket);
    }
}

const Multiplayer = new MultiplayerManager();
export default Multiplayer;
