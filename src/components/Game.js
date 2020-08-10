'use strict';
import React from 'react';
import * as THREE from "three";
import Input from '../engine/Input';



import GameEngine from '../engine/GameEngine';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
   
       
    }

    Load = () => {
        GameEngine.InitRenderer(this.canvas, 1024, 600);
        document.body.appendChild(GameEngine.GetRenderer().domElement);
      
    }

   
    HandleKeyPress(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.key);
        Input.addKey(e.key);
    }

    HandleKeyUp(e) {
        e.preventDefault(); 
        e.stopPropagation();
        Input.removeKey(e.key);
       
    }

    render() {
       
        return (
            <canvas tabIndex="0" onKeyDown={this.HandleKeyPress} onKeyUp={this.HandleKeyUp} ref={(c) => {this.canvas = c; this.Load();}}/>
        )
    }
}
