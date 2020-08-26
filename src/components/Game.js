import React from 'react';
import Input from '../engine/Input';
import GameEngine from '../engine/GameEngine';
import Scene from '../engine/Scene';
import Camera from '../engine/Camera';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        window.addEventListener('resize', this.ScreenResize);
    }
 
    Load = () => {
        Scene.setScreenSize(window.innerWidth - 3, window.innerHeight - 3);
        GameEngine.InitRenderer(this.canvas, Scene.screenWidth, Scene.screenHeight);
        Camera.Configure(60, Scene.aspectRatio, 0.1, 1000.0);
        document.body.appendChild(GameEngine.GetRenderer().domElement);
        this.canvas.focus();
    }

    ScreenResize = () => {
        Scene.setScreenSize(window.innerWidth - 3, window.innerHeight - 3);
        GameEngine.InitRenderer(this.canvas, Scene.screenWidth, Scene.screenHeight);
        Camera.Configure(60, Scene.aspectRatio, 0.1, 1000.0);
    }
   
    gamepadConnected(e){
        console.log(e);
    }

    gamepadeDisconnected(e){
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
                <canvas  style={{width: '100%', alignItems:'center'}} tabIndex="0" onKeyDown={this.HandleKeyPress} onKeyUp={this.HandleKeyUp} ref={(c) => {this.canvas = c; this.Load();}} onBlur={this.clearInput}/>
        )
    }
}
