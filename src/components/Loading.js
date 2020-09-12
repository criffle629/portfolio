import React from 'react';
import { Link } from "react-router-dom";
import Audio from '../engine/Audio';
import Scene from '../engine/Scene';
import 'fontsource-ubuntu';
export default class Loading extends React.Component {

    constructor(props){
        super(props);
        this.state = {loadingCounter: 0, loaded : false};
     
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
            <div style={{width: '300px', height:'100px', position:'absolute', top:'50%', left:'50%', marginLeft: -150, marginTop: -50,fontFamily: 'Ubuntu',fontSize:'4em', overflow: 'hidden' }}>
                {loading}
            </div>
        );
    }

    renderPlayer(){
        return(

            <div style={{width: '300px', height:'100px', position:'absolute', textAlign:'center', top:'50%', left:'50%', marginLeft: -150, marginTop: -50,fontFamily: 'Ubuntu',fontSize:'4em', overflow: 'hidden' }}>
               <Link style= {{textDecoration: 'none' }} onClick={this.playSound} to="/game">Enter</Link>
            </div> 
        );
    }

    render() {
        return this.state.loaded ? this.renderPlayer() : this.renderLoading();
    }
}