import React from 'react';
 import Gamepad from '../engine/Gamepad';
import Input from '../engine/Input';
import MathTools from '../engine/MathTools';
import Vector2 from '../engine/Vector2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
export default class Game extends React.Component {

    constructor(props) {
        super();

        this.joystickCoord= {
                x: 100,
                y: 85,
            };

        this.mouseDown = false;
        
        this.stickRef = React.createRef();
       
        document.addEventListener("touchmove", this.onDrag, true);
     
        document.addEventListener("touchend", this.onDragEnd, true);
        document.addEventListener("touchcancel", this.onDragEnd, true);
    
    }

    componentDidMount() {
        if(this.strickRef){
            this.stickRef.beginPath();
            this.stickRef.arc(0, 0, 40, 0, 2 * Math.PI);
            this.stickRef.lineWidth = 3;
            this.stickRef.translate(0.5, 0.5);
            this.stickRef.stroke();
        }
    }

    distance(coord1, coord2) {
        const delta = {
            x: coord1.x - coord2.x,
            y: coord1.y - coord2.y
        };

        return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
    }

    onDragStart = (e) => {
        this.mouseDown = true;
    }

    onDrag = (e) => {

        if (!this.mouseDown) return;

        const xCoord = e.touches[0].clientX;
        const yCoord = window.innerHeight - e.touches[0].clientY;

        const coord1 = {
            x: xCoord,
            y: yCoord
        };

        const coord2 = {
            x: window.innerHeight - 150,
            y: 85
        };
        const dist = this.distance(coord1, coord2);

        const xVal = MathTools.clamp((coord1.x - coord2.x) / 75, -1.0, 1.0);
        const yVal = MathTools.clamp((coord1.y - coord2.y) / 75, -1.0, 1.0) * -1;

        Gamepad.touchAxis = new Vector2(xVal, yVal);
        if (dist <= 75 && this.stickRef  ) {

            this.stickRef.current.style.cssText = `top:${(window.innerHeight - 150) + xVal}; left: ${85 + yVal}; width: '100px'; height: '100px'; position: 'absolute'; zIndex:5;`;
 
        }
    }

    onDragEnd = (e) => {
    if (this.stickRef && this.stickRef.current && this.stickRef.current.style && this.mouseDown){
        this.stickRef.current.style.cssText = `top:${window.innerHeight - 150}; left: ${85 }; width: '100px'; height: '100px'; position: 'absolute'; zIndex:5;`;
    }
 
            this.mouseDown = false;
        
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
                <div  style={{top:window.innerHeight - 150, left: 85,
                    width: '100px', height: '100px', position: 'absolute', zIndex:5}}
                    ref= {this.stickRef}
                    onTouchStart={this.onDragStart}
                    onTouchEnd={this.onDragEnd}
                 
                     >
                <canvas  
                                ref= { (ref) => {
                                
                                    this.canvasRef = ref.getContext('2d');
                                    this.canvasRef.beginPath();
                                    this.canvasRef.arc(50, 50, 30, 0, 2 * Math.PI);
                                    this.canvasRef.lineWidth = 3;
                                    this.canvasRef.strokeStyle ='rgb(17.6%, 43.9%, 59.2%, 50%)';
                                    this.canvasRef.stroke();
                                }} 
                                width='100px'
                                height='100px'
                       
                                >

                        </canvas>
                        </div>
                        <canvas   style={{top: window.innerHeight - 150, left: 85,
                    width: '100px', height: '100px', position: 'absolute'}}
                                ref= { (ref) => {
                                    let ctx = ref.getContext('2d');
                                    ctx.beginPath();
                                    ctx.arc(50, 50, 40, 0, 2 * Math.PI);
                                    ctx.lineWidth = 3;
                                    ctx.strokeStyle ='rgb(17.6%, 43.9%, 59.2%, 50%)';
                                    ctx.stroke();
                                }} 
                                width='100px'
                                height='100px'
                                onTouchStart={this.onDragStart}
                                onTouchEnd={this.onDragEnd}>

                        </canvas>

 
           
          

            
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
