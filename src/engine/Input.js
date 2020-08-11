class InputManager{
    constructor(){
        this.inputQueue = new Map();
    }

    addKey(key){
        this.inputQueue.set(key, 1);
    }

    removeKey(key){
       this.inputQueue.delete(key);
    }

    isPressed(key){
        return this.inputQueue.has(key);
    }

    clearKeys(){
        this.inputQueue.clear();
    }
}

const Input = new InputManager();
Object.freeze(Input);

export default Input;