import React from 'react';
import Gamepad from '../../engine/Gamepad';
import GamepadUI from './components/GamepadUI';
import Scene from '../../engine/Scene';
import Camera from '../../engine/Camera';
import GameEngine from '../../engine/GameEngine';
import TouchControls from '../TouchControls';
import ControlInfo from '../ControlInfo';
//import { isMobile } from 'react-device-detect';

const isMobile = false;

export default class MainGameUI extends React.Component {

    constructor(props) {
        super();
        this.canvas = null;
        this.isLoaded = false;
        this.state = {}
        Gamepad.connectedCallback = this.gamepadConnected;
        window.addEventListener('resize', this.ScreenResize);
    }

    gamepadConnected = () => {
        this.setState({ gamepadConnected: true });
    }

    ScreenResize() {
        Scene.setScreenSize(document.body.clientWidth, document.body.clientHeight);
        Camera.Configure(60, Scene.aspectRatio, 0.1, 1000.0);

        GameEngine.GetRenderer().setSize(Scene.screenWidth, Scene.screenHeight);
    }

    gamepadConnected(e) {
        console.log(e);
    }

    gamepadeDisconnected(e) {
        console.log(e);
    }

    closeModal = () => {
        this.setState({ currentModal: 'none' });
    }

    openModal = (modal) => {
        this.setState({ currentModal: modal });
    }

    isModalOpen = () => {
        return this.state.currentModal !== 'none';
    }

    renderTouchControl() {
        if (isMobile)
            return (<TouchControls />);
    }
    
    render() {
        return (
            <div style={{ position: 'absolute', width: '100vw', height: '100vh', padding: 0, margin: 0, overflow: 'hidden', zIndex: 1 }}>

                {this.renderTouchControl()}
                <GamepadUI />
                <ControlInfo />
                <div style={{ position: 'relative', width: '100vw', height: '100vh', padding: 0, margin: 0, overflow: 'hidden', zIndex: 1 }}>

                </div>
            </div>
        )
    }
}