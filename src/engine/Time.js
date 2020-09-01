import { Clock } from "three";

class TimeManager{
 
    constructor(){
        this.clock = new Clock(true);
        this.deltaTime = 0;
    }

    Update(){
        this.deltaTime = this.clock.getDelta();  
    }

    DeltaTime(){
        return this.deltaTime;
    }
}

const Time = new TimeManager();
export default Time;