import React from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import Gamepad from '../engine/Gamepad';
import Input from '../engine/Input';
import MathTools from '../engine/MathTools';
import Vector2 from '../engine/Vector2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
export default class Game extends React.Component {

    constructor(props) {
        super();

        this.state = {
            joystickCoord: {
                x: 100,
                y: 85,
            },
            mouseDown: false,
        };


        document.addEventListener("touchmove", this.onDrag, true);
        document.addEventListener("touchend", this.onDragEnd, true);
        document.addEventListener("touchcancel", this.onDragEnd, true);
    }

    componentDidMount() {

    }


    distance(coord1, coord2) {
        const delta = {
            x: coord1.x - coord2.x,
            y: coord1.y - coord2.y
        };

        return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
    }

    onDragStart = (e) => {
        this.setState({ mouseDown: true });
    }

    onDrag = (e) => {

        if (!this.state.mouseDown) return;

        const xCoord = e.touches[0].clientX;
        const yCoord = window.innerHeight - e.touches[0].clientY;

        const coord1 = {
            x: xCoord,
            y: yCoord
        };

        const coord2 = {
            x: 100,
            y: 85
        };
        const dist = this.distance(coord1, coord2);

        const xVal = MathTools.clamp((coord1.x - coord2.x) / 75, -1.0, 1.0);
        const yVal = MathTools.clamp((coord1.y - coord2.y) / 75, -1.0, 1.0) * -1;

        Gamepad.touchAxis = new Vector2(xVal, yVal);
        if (dist <= 75) {
            this.setState({
                joystickCoord: {
                    x: xCoord,
                    y: yCoord
                }
            });
        }
    }

    onDragEnd = (e) => {
        this.setState({
            joystickCoord: {
                x: 100,
                y: 85
            },
            mouseDown: false
        });
        Gamepad.touchAxis = new Vector2(0, 0);
    }

    onButtonPress = (e, button) => {
        Input.addKey(button);
    }

    onButtonUp = (e, button) => {
        Input.removeKey(button);
    }

    render() {
        return (
            <div>
                <Stage width={window.innerWidth} height={window.innerHeight} >

                    <Layer >

                        <Circle
                            width='100px'
                            height='100px'
                            x={100} y={window.innerHeight - 85} radius={60}
                            fill='transparent' stroke='rgb(17.6%, 43.9%, 59.2%)'
                            strokeWidth='3'
                        />

                        <Circle

                            width='100px'
                            height='100px'
                            x={this.state.joystickCoord.x} y={window.innerHeight - this.state.joystickCoord.y} radius={40}
                            fill='transparent' stroke='rgb(17.6%, 43.9%, 59.2%)'
                            strokeWidth='3'
                            onTouchStart={this.onDragStart}
                        />

                    </Layer>

                </Stage>
                <div style={{width: '100%', height:'100%'}}>
                    <FontAwesomeIcon color="#495057" 
                                     size='5x' 
                                     icon={faCaretSquareUp} 
                                     style={{position:'fixed',userSelect:'none', bottom: window.innerHeight - (window.innerHeight - 150), right: window.innerWidth - (window.innerWidth - 75)}}
                                     onTouchStart={(e) => {this.onButtonPress(e, 'w')}}
                                     onTouchEnd={(e) => {this.onButtonUp(e, 'w')}}
                                     />
                    <FontAwesomeIcon color="#495057" 
                                     size='5x' 
                                     icon={faCaretSquareDown} 
                                     style={{position:'fixed', userSelect:'none', bottom: window.innerHeight - (window.innerHeight - 75), right: window.innerWidth - (window.innerWidth - 75)}}
                                     onTouchStart={(e) => {this.onButtonPress(e, 's')}}
                                     onTouchEnd={(e) => {this.onButtonUp(e, 's')}}
                                     />
                    <div style={{   display: 'flex',
                                    borderStyle:'solid black', 
                                    borderWidth: '3px',
                                    borderRadius:'10px',
                                    userSelect:'none',
                                    position:'fixed', 
                                    width:'70px', 
                                    height:'70px', 
                                    fontSize:'32px',
                                    backgroundColor:'#495057',
                                    color:'white',
                                    outline:'none', 
                                    textAlign:'center',
                                    justifyContent:'center',
                                    alignItems: "center",
                                    bottom: window.innerHeight - (window.innerHeight - 80), 
                                    right: window.innerWidth - (window.innerWidth - 150) }}
                        onTouchStart={(e) => {this.onButtonPress(e, 'e')}}
                        onTouchEnd={(e) => {this.onButtonUp(e, 'e')}}
                    >
                                E
                    </div>

                    <div style={{   display: 'flex',
                                    borderStyle:'solid black', 
                                    borderWidth: '3px',
                                    borderRadius:'10px',
                                    userSelect:'none',
                                    position:'fixed', 
                                    width:'70px', 
                                    height:'70px', 
                                    fontSize:'32px',
                                    backgroundColor:'#495057',
                                    color:'white',
                                    outline:'none', 
                                    textAlign:'center',
                                    justifyContent:'center',
                                    alignItems: "center",
                                    bottom: window.innerHeight - (window.innerHeight - 155), 
                                    right: window.innerWidth - (window.innerWidth - 150) }}
                        onTouchStart={(e) => {this.onButtonPress(e, 'r')}}
                        onTouchEnd={(e) => {this.onButtonUp(e, 'r')}}
                    >
                                R
                    </div>

                </div>
            </div>

        )
    }
}
