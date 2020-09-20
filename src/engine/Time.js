import { Clock } from "three";
import GameEngine from './GameEngine';
class TimeManager{
 
    static MIN_PHYSICS_RATE = 1.0 / 30.0;

    constructor(){
        this.clock = new Clock(true);

        this.deltaBuffer = [];
        this.dtBufferIndex = 0;
        this.deltaBuffer.fill(0, 0, 10);
        this.deltaTime = 0;
        this.smoothDelta = 0;
        this.physicsRate = 1.0 / 60.0;
    }

    Update(){
        this.deltaTime = this.clock.getDelta();  

        this.deltaBuffer[this.dtBufferIndex] = this.deltaTime;
        this.dtBufferIndex = (this.dtBufferIndex + 1) % this.deltaBuffer.length;

        this.smoothDelta = this.SmoothDelta();

        this.physicsRate = 1.0 / GameEngine.frameRate;

        if (this.physicsRate === Infinity)
            this.physicsRate = this.deltaTime;

        if (this.physicsRate < Time.MIN_PHYSICS_RATE)
            this.physicsRate = this.deltaTime;
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