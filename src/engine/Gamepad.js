import Vector2 from './Vector2';
import Gamepads from 'gamepads';

class GamepadManager {

    constructor() {

        this.Buttons = {
            BUTTON_BOTTOM: 0,
            BUTTON_RIGHT: 1,
            BUTTON_LEFT: 2,
            BUTTON_TOP: 3,
            BUMPER_LEFT: 4,
            BUMPER_RIGHT: 5,
            TRIGGER_LEFT: 6,
            TRIGGER_RIGHT: 7,
            BUTTON_CONTROL_LEFT: 8,
            BUTTON_CONTROL_RIGHT: 9,
            BUTTON_JOYSTICK_LEFT: 10,
            BUTTON_JOYSTICK_RIGHT: 11,
            D_PAD_UP: 12,
            D_PAD_BOTTOM: 13,
            D_PAD_LEFT: 14,
            D_PAD_RIGHT: 15,
            BUTTON_CONTROL_MIDDLE: 16,
        };

        this.buttonsDown = new Map();
        this.buttonsPressed = new Map();

        this.connected = false;
        Gamepads.start();

        this.leftAxis = Vector2.zero;
        this.rightAxis = Vector2.zero;

        Gamepads.addEventListener('connect', e => {
            this.connected = true;
            e.gamepad.addEventListener('joystickmove', e => {
                this.leftAxis = new Vector2(e.horizontalValue, e.verticalValue);
            }, [0, 1]);

            e.gamepad.addEventListener('joystickmove', e => {
                this.rightAxis = new Vector2(e.horizontalValue, e.verticalValue);
            }, [2, 3]);

            e.gamepad.addEventListener('buttonpress', e => {
                this.addButton(e.index);
            });
            e.gamepad.addEventListener('buttonrelease', e => {
                this.removeButton(e.index);
            });
        });

        Gamepads.addEventListener('disconnect', e => {
            this.connected = false;
        });
    }

    deadzone(axis) {
        let newAxis = axis;

        if (Math.abs(newAxis.x) < 0.015)
            newAxis.x = 0;

        if (Math.abs(newAxis.y) < 0.015)
            newAxis.y = 0;

        return newAxis;
    }

    leftStick() {
        if (!this.connected) return Vector2.zero;
        let axis = this.deadzone(this.leftAxis);

        return axis;
    }

    rightStick() {
        if (!this.connected) return Vector2.zero;
        let axis = this.deadzone(this.rightAxis);

        return axis;
    }

    addButton(button) {
        this.buttonsDown.set(button, 1);
        if (this.buttonsPressed.get(button) !== 2) {
            this.buttonsPressed.set(button, 1);
        }
    }

    removeButton(button) {
        this.buttonsDown.delete(button);
        this.buttonsPressed.delete(button);
    }

    isButtonDown(button) {
        return this.buttonsDown.has(button);
    }

    isButtonPressed(button) {

        if (this.buttonsPressed.has(button) && this.buttonsPressed.get(button) === 1) {
            this.buttonsPressed.set(button, 2);
            return true;
        }

        return false;
    }

    getTrigger(trigger) {

    }

    clearButtons() {
        this.buttonsDown.clear();
        this.buttonsPressed.clear();
        this.leftAxis = Vector2.zero;
        this.rightAxis = Vector2.zero;
    }

    isConnected() {
        return this.connected;
    }
}

const Gamepad = new GamepadManager();
export default Gamepad;