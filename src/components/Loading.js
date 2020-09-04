import React from 'react';
import { Link } from "react-router-dom";
import Audio from '../engine/Audio';

export default class Loading extends React.Component {


    playSound = () =>{
        Audio.PlaySoundsMuted();
    }

    render() {
        return(
            <div>
            <Link onClick={this.playSound} to="/game">Game</Link>
            </div>
        );
    }
}