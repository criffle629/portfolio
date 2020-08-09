'use strict';

class InputManager{
    constructor(){
        this.inputQueue = {};
    }

    addKey(key){
        this.inputQueue[key] = 1;
    }

    removeKey(key){
        delete this.inputQueue[key];
    }

    isPressed(key){
        return key in this.inputQueue;
    }

    clearKeys(){
        this.inputQueue = {};
    }
}

const Input = new InputManager();
Object.freeze(Input);

export default Input;