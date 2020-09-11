import React from 'react';
import Input from '../../engine/Input';
import Gamepad from '../../engine/Gamepad';
import GamepadUI from './components/GamepadUI';

import 'fontsource-ubuntu';

export default class MainGameUI extends React.Component {

    constructor(props) {
        super(props);
        this.canvas = null;
        this.isLoaded = false;
        this.state = {

        }
        Gamepad.connectedCallback = this.gamepadConnected;
        window.addEventListener('resize', this.ScreenResize);
    }

    gamepadConnected = () => {
        this.setState({gamepadConnected: true});
    }

    componentDidMount() {


    }

    Load = () => {

    }

    ScreenResize = () => {

    }

    gamepadConnected(e) {
        console.log(e);
    }

    gamepadeDisconnected(e) {
        console.log(e);
    }
    HandleKeyPress(e) {
        e.preventDefault();
        e.stopPropagation();
        Input.addKey(e.key);
    }

    HandleKeyUp(e) {
        e.preventDefault();
        e.stopPropagation();
        Input.removeKey(e.key);
    }

    clearInput = () => {
        Input.clearKeys();
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

    render() {
        return (
            <div style={{ fontFamily: 'Ubuntu', position: 'absolute', width: '100vw', height: '100vh', padding: 0, margin: 0, overflow: 'hidden', zIndex: 1 }}>
                     <GamepadUI/>
                <div style={{ position: 'relative', width: '100vw', height: '100vh', padding: 0, margin: 0, overflow: 'hidden', zIndex: 1 }}>
               
   
                </div>
            </div>
        )
    }
    //<span style= {{backgroundColor:'white', borderRadius: '25px', padding: '10px', top: 15, left: 15, position:'absolute'}}>Menu: esc</span>
}
