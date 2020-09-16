import { Clock } from "three";
import GameEngine from './GameEngine';
class TimeManager{
 
    constructor(){
        this.clock = new Clock(true);

        this.deltaBuffer = [];
        this.dtBufferIndex = 0;
        this.deltaBuffer.fill(0, 0, 10);
        this.deltaTime = 0;
        this.smoothDelta = 0;
        this.physicsRate = 0;
    }

    Update(){
        this.deltaTime = this.clock.getDelta();  

        this.deltaBuffer[this.dtBufferIndex] = this.deltaTime;
        this.dtBufferIndex = (this.dtBufferIndex + 1) % this.deltaBuffer.length;

        this.smoothDelta = this.SmoothDelta();

        this.physicsRate = parseFloat(1.0 / GameEngine.frameRate);
    }

    SmoothDelta(){
        let sum = 0;

        for (let i = 0; i < this.deltaBuffer.length; i++){
            sum += this.deltaBuffer[i];
        }

        return sum / this.deltaBuffer.length;
    }

    DeltaTime(){
        return this.deltaTime;
    }
}

const Time = new TimeManager();
export default Time;