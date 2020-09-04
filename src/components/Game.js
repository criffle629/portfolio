import React from 'react';
import Input from '../engine/Input';
import GameEngine from '../engine/GameEngine';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';
import RoadRacerModal from './modal/RoadRacerModal';
import MightyChickenModal from './modal/MightyChickenModal';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.canvas = null;
        this.isLoaded = false;
        this.state = {
            currentModal: 'none'
        }
        window.addEventListener('resize', this.ScreenResize);
    }

    componentDidMount(){
        GameEngine.Init();
    }

    Load = () => {

        if (this.isLoaded) return;

        this.isLoaded = true;
        Scene.setScreenSize(document.body.clientWidth, document.body.clientHeight );
        Camera.Configure(60, Scene.aspectRatio, 0.1, 1000.0);
        GameEngine.InitRenderer(this.canvas, Scene.screenWidth, Scene.screenHeight);
        GameEngine.SetOpenModalCallback(this.openModal, this.isModalOpen);
        this.canvas.focus();
    }

    ScreenResize = () => {
        if (this.canvas !== null && this.canvas !== 'undefined') {
            Scene.setScreenSize(document.body.clientWidth, document.body.clientHeight );
            Camera.Configure(60, Scene.aspectRatio, 0.1, 1000.0);

            GameEngine.GetRenderer().setSize(Scene.screenWidth, Scene.screenHeight);
        }
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
        this.setState({currentModal: 'none'});
    }

    openModal = (modal) => {
        this.setState({currentModal: modal});
    }

    isModalOpen = () => {
        return this.state.currentModal !== 'none';
    }

    render() {
        return (
            <div  style={{   width: '100vw', height:'100vh', padding:0, margin:0, overflow:'hidden' }}>
                
                <canvas style={{ display: 'block', width: '100vw', height: '100vh', position:'fixed'}} tabIndex="0" onKeyDown={this.HandleKeyPress} onKeyUp={this.HandleKeyUp} ref={(c) => { this.canvas = c; this.Load(); }} onBlur={this.clearInput} />
                <RoadRacerModal isOpen={this.state.currentModal === 'roadracer'} closeModal={this.closeModal}/>
                <MightyChickenModal isOpen={this.state.currentModal === 'mightychicken'} closeModal={this.closeModal}/>

            </div>
        )
    }
}
