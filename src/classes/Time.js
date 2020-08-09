'use strict';

export default class Time{
 
    constructor(){
        this.lastTime = performance.now();
        this.dT = 0.0;
    }

    update(){
        let currentTime = performance.now();
     
        this.dT = currentTime - this.lastTime;

        this.lastTime = currentTime;         
    }

    deltaTime()
    {
        return ((this.dT * 0.001) + 0.00000000001);
    }
}