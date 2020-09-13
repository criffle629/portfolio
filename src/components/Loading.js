import React from 'react';
import Audio from '../engine/Audio';
import Scene from '../engine/Scene';
import styled, { keyframes } from "styled-components";

export default class Loading extends React.Component {

    constructor(props){
        super(props);
        this.state = {loadingCounter: 0, 
                      loaded : false, 
                      finished: false,
                      fade: false};
    }

    componentDidMount(){
        this.loadingInterval = setInterval(this.loading, 500);
    }

    loading = () => {        
        if (Scene.objectLoading === Scene.objectLoaded){
            this.setState({loaded: true});
            clearInterval(this.loadingInterval);
        }
        else{
            let count = this.state.loadingCounter;
            count = (count + 1) % 4;
            this.setState({loadingCounter: count});
        }
    }  

    playSound = () =>{
        Audio.PlaySoundsMuted();
    }

    renderLoading(){
        const period = '.';
        let loading = 'loading' + period.repeat(this.state.loadingCounter);
        return(
            <div style={{background:'white', width:'100%', height:'100%', position:'absolute', top:0, left:0}}>
                <div style={{background:'white', width: '300px', height:'100px', position:'absolute', top: 0, left: 0, bottom: 0, right: 0, margin: 'auto', fontSize:'4em', overflow: 'hidden' }}>
                    {loading}
                </div>
            </div>
        );
    }

    onAnimationEnd = () =>{
        this.setState({finished: true});
    }

    enterClicked = () => { 
        this.playSound(); // Must play sound muted on user interaction to prevent browser from blocking audio.
        this.setState({fade: true});
    }
    renderFade(){

        const fadeOut = keyframes`
            from { opacity: 1; }
            to { opacity: 0; }    
        `;

        const Fade = styled.div`
        background: white;
        position:absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        translateZ(0);
        z-index: 150;
        backface-visibility: hidden;
        perspective: 1000;
        animation:  ${this.state.fade ? fadeOut : null } 0.5s;
        animation-timing-function: linear;
  
    `;
        const Button = styled.button`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            height: 100px;
            width: 180px;
            font-size: 48px;
            background-color: white;
            border: 2px solid black;
            border-radius: 20px;
            outline: none;
        `;

        return(

            <Fade onAnimationEnd={this.onAnimationEnd}>
                <Button onClick={this.enterClicked}> Enter </Button>
            </Fade>
           
        );
    }

    render() {

        return !this.state.loaded ? this.renderLoading() : !this.state.finished ? this.renderFade() : null;
    }
}