export default class InputManager {
    constructor() {
        this.inputEvent = [];
        this.keyDown = new Map();
        this.keyPressed = new Map();
    }

    registerEvent(callback) {
        this.inputEvent.push({ function: callback });
    }

    emitEvent() {
        for (let i = 0; i < this.inputEvent.length; i++) {
            this.inputEvent[i].function(this.keyDown.size > 0 || this.keyPressed.size > 0 ? true : false);
        }
    }

    addKey(key) {
        this.keyDown.set(key.toLowerCase(), 1);
        if (this.keyPressed.get(key.toLowerCase()) !== 2) {
            this.keyPressed.set(key.toLowerCase(), 1);
            this.emitEvent();
        }
    }

    removeKey(key) {
        this.keyDown.delete(key.toLowerCase());
        this.keyPressed.delete(key.toLowerCase());
        this.emitEvent();
    }

    isKeyDown(key) {
        return this.keyDown.has(key.toLowerCase());
        this.emitEvent();
    }

    isKeyPressed(key) {
        if (this.keyPressed.has(key.toLowerCase()) && this.keyPressed.get(key.toLowerCase()) === 1) {
            this.keyPressed.set(key.toLowerCase(), 2);
            this.emitEvent();
            return true;
        }

        return false;
    }

    clearKeys() {
        this.keyDown.clear();
        this.keyPressed.clear();
        this.emitEvent();
    }

    json() {
        return {
            keyDown: this.keyDown,
            keyPressed: this.keyPressed
        }
    }
}