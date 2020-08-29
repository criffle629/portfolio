import React from 'react';
import Input from '../engine/Input';
import GameEngine from '../engine/GameEngine';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.canvas = null;
        window.addEventListener('resize', this.ScreenResize);
    }

    Load = () => {
        Scene.setScreenSize(document.body.clientWidth, document.body.clientHeight );
        Camera.Configure(60, Scene.aspectRatio, 0.1, 1000.0);
        GameEngine.InitRenderer(this.canvas, Scene.screenWidth, Scene.screenHeight);
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
    render() {
        return (
            <div style={{ display: 'flex', width: '100%', height:'100vh', padding:0, margin:0, flexDirection: 'column'}}>
        
                <canvas style={{ width: '100%', height: '100vh', position:'absolute'}} tabIndex="0" onKeyDown={this.HandleKeyPress} onKeyUp={this.HandleKeyUp} ref={(c) => { this.canvas = c; this.Load(); }} onBlur={this.clearInput} />
            </div>
        )
    }
}
