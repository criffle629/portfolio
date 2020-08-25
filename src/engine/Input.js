class InputManager{
    constructor(){
        this.inputQueue = new Map();
    }

    addKey(key){
        this.inputQueue.set(key.toLowerCase(), 1);
    }

    removeKey(key){
       this.inputQueue.delete(key.toLowerCase());
    }

    isPressed(key){
        return this.inputQueue.has(key.toLowerCase());
    }

    clearKeys(){
        this.inputQueue.clear();
    }
}

const Input = new InputManager();
Object.freeze(Input);

export default Input;