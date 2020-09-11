import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import styled, { keyframes } from "styled-components";
import Gamepad from '../../../engine/Gamepad';

export default class GamepadUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popup: 'none'
        };
        this.animCount = 0;
        Gamepad.statusCallback = this.setStatus;
    }
    
    setStatus = (status) =>{
        this.animCount = 0;
        this.setState({popup: status});
    }

    onAnimationEnd = () => {
        this.animCount++;

        if (this.animCount >= 2){
            this.animCount = 0;
            this.setState({popup: 'none'});
        }
    }

    render() {
        let render = false;

        if (this.state.popup === 'connected' || this.state.popup === 'disconnected')
            render = true;

        const style = {
            gamepadUI: {
                position: 'fixed', width: '100vw', height: '100vh', padding: 0, margin: 0, overflow: 'hidden', zIndex: 1,
            }
        };
        return (
            <div style={style.gamepadUI}>
                {render ? this.renderComponent() : null}
            </div>
        );
    }

    renderComponent() {

        const popin = keyframes`
            from { left: 150%; }
            to { left: 75%; }
            from { top:50%; }
            to  { top: 50%; }       
        `;

        const wait = keyframes`
            from { left: 75%; }
            to { left: 75%; }
            from { top: 50%; }
            to { top: 50%; } 
        `;

        const drop = keyframes`
            from { left: 75%; }
            to { left: 75%; }
            from { top: 50%; }
            to { top: 150%; }
        `;

        const PopUp = styled.span`
            background-color: white;
            border-radius: 25px;
            border: 3px solid black;
            padding: 10px;
            position: fixed;
            width: 200px;
            translateZ(0);
            backface-visibility: hidden;
            perspective: 1000;
            animation:  ${popin} 1.0s, ${wait} 2s,  ${drop} 0.5s;
            animation-delay: 0s, 1s, 2s;
            animation-timing-function: ease-out, ease-in;
        `;

        return (
            <PopUp onAnimationEnd={this.onAnimationEnd}> 
                <FontAwesomeIcon color="##495057" size='lg' icon={faGamepad} /> Gamepad {this.state.popup} 
            </PopUp>
        );
    }
}
