import Vector2 from './Vector2';
import Gamepads from 'gamepads';

export default class GamepadManager {

    constructor(noListener = false) {

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

        this.statusCallback = null;

        this.buttonsDown = new Map();
        this.buttonsPressed = new Map();

        this.connected = false;


        this.inputAxisSmoothAmount = 10;
        this.leftAxis = new Vector2(0, 0);

        this.rightAxis = new Vector2(0, 0);

        this.rightTriggerValue = 0.0;
        this.leftTriggerValue = 0.0;
        this.gamepad = null;
        if (!noListener) {
            Gamepads.start();
            Gamepads.addEventListener('connect', e => {
                this.connected = true;
                this.gamepad = e.gamepad;
                
                if (this.statusCallback !== null){
                    this.statusCallback('connected');
                }

                e.gamepad.addEventListener('joystickmove', e => {
                    // Multiply by 1.12 because axis values only reaching +/- 0.9 instead of 1.0
                    this.leftAxis.x = e.horizontalValue * 1.12;
                    this.leftAxis.y = e.verticalValue * 1.12;

                }, [0, 1]);

                e.gamepad.addEventListener('joystickmove', e => {
                    // Multiply by 1.12 because axis values only reaching +/- 0.9 instead of 1.0
                    this.rightAxis.x = e.horizontalValue * 1.12;
                    this.rightAxis.y = e.verticalValue * 1.12;
                }, [2, 3]);

                e.gamepad.addEventListener('buttonpress', e => {

                    this.addButton(e.index);
                });

                e.gamepad.addEventListener('buttonvaluechange', e => {
                    this.rightTriggerValue = e.value;

                }, 7);

                e.gamepad.addEventListener('buttonvaluechange', e => {
                    this.leftTriggerValue = e.value;
                }, 6);

                e.gamepad.addEventListener('buttonpress', e => {
                    this.addButton(e.index);
                });
                e.gamepad.addEventListener('buttonrelease', e => {
                    this.removeButton(e.index);
                });
            });

            Gamepads.addEventListener('disconnect', e => {
                this.connected = false;
                if (this.statusCallback !== null){
                    this.statusCallback('disconnected');
                }
                
            });
        }
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


        return this.leftAxis;
    }

    rightStick() {
        if (!this.connected) return Vector2.zero;

        return this.rightAxis;
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

    rightTrigger() {
        return this.rightTriggerValue;
    }

    leftTrigger() {
        return this.leftTriggerValue;
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

    update() { }

    json() {
        return {
            buttonsDown: this.buttonsDown,
            buttonsPressed: this.buttonsPressed,
            leftAxis: this.leftAxis,
            rightAxis: this.rightAxis,
            rightTrigger: this.rightTriggerValue,
            leftTrigger: this.leftTriggerValue
        }
    }
}
