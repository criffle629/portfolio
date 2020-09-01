class InputManager{
    constructor(){
        this.keyDown = new Map();
        this.keyPressed = new Map();
    }

    addKey(key){
        this.keyDown.set(key.toLowerCase(), 1);
        if (this.keyPressed.get(key.toLowerCase()) !== 2){
            this.keyPressed.set(key.toLowerCase(), 1);
        }
    }

    removeKey(key){
       this.keyDown.delete(key.toLowerCase());
       this.keyPressed.delete(key.toLowerCase());
    }

    isKeyDown(key){
        return this.keyDown.has(key.toLowerCase());
    }


    isKeyPressed(key){
       
        if (this.keyPressed.has(key.toLowerCase()) && this.keyPressed.get(key.toLowerCase()) === 1){
            this.keyPressed.set(key.toLowerCase(), 2);
            return true;
        }

        return false;
    }

    clearKeys(){
        this.keyDown.clear();
        this.keyPressed.clear();
    }
}

const Input = new InputManager();


export default Input;