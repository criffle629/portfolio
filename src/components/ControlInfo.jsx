import React from 'react';
import Input from '../engine/Input';
import MainGame from '../maingame/MainGame';
export default class ControlInfo extends React.Component {

    constructor(props) {
        super();
        this.isFaded = false;
        this.fadeValue = 1;
        this.state = { fade: fadeOut };
        this.mounted = false;
        Input.registerEvent(this.fadeEvent);
    }

    componentDidMount() {
        this.mounted = true;
    }

    stateChange(value) {
        if (!this.mounted) return;

        if (value) {
            this.setState({ fade: fadeOut });
        }
        else
            this.setState({ fade: fadeIn });
    }

    fadeEvent = (value) => {
        if (MainGame.instance.loaded)
            this.stateChange(value);
    }

    drawButton(str) {
        return (

            <div style={{
                display: 'flex',
                borderStyle: 'solid black',
                borderWidth: '3px',
                borderRadius: '10px',
                userSelect: 'none',
                position: 'fixed',
                width: '35px',
                height: '35px',
                fontSize: '16px',
                backgroundColor: '#495057',
                color: 'white',
                outline: 'none',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: "center",
            }}>
                {str}
            </div>
        );
    }

    render() {
        return (
            <div style={this.state.fade}>

                <div style={{ width: '100%', height: '30px', display: 'flex', textAlign: 'center', justifyContent: 'center', color: '#495057' }}>
                    MOVE
                </div>


                <div style={{ width: '100%', height: '40px', display: 'flex', textAlign: 'center', justifyContent: 'center', color: 'black' }}>
                    {this.drawButton('W')}
                </div>

                <div style={{ width: '100%', height: '40px', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                    <div style={{ width: '50px', height: '40px', display: 'flex', textAlign: 'center', justifyContent: 'center', color: 'black' }}>
                        {this.drawButton('A')}
                    </div>        <div style={{ width: '50px', height: '40px', display: 'flex', textAlign: 'center', justifyContent: 'center', color: 'black' }}>
                        {this.drawButton('S')}
                    </div>        <div style={{ width: '50px', height: '40px', display: 'flex', textAlign: 'center', justifyContent: 'center', color: 'black' }}>
                        {this.drawButton('D')}
                    </div>
                </div>

                <div style={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                    <div style={{ width: '50px', height: '40px', display: 'flex', textAlign: 'center', justifyContent: 'center', color: 'black' }}>
                        {this.drawButton('C')}
                    </div>
                    <div style={{ width: '100px', height: '30px', display: 'flex', textAlign: 'center', justifyContent: 'center', color: '#495057' }}>
                        CAMERA
                    </div>
                </div>

            </div>



        )
    }
}

const fadeOut = {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid black',
    borderWidth: '3px',
    borderRadius: '10px',
    userSelect: 'none',
    position: 'fixed',
    width: '200px',
    height: '200px',
    color: 'white',
    outline: 'none',
    textAlign: 'center',
    alignItems: "center",
    bottom: 0,
    right: 0,
    transition: 'opacity 0.5s',
    opacity: 0

}

const fadeIn = {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid black',
    borderWidth: '3px',
    borderRadius: '10px',
    userSelect: 'none',
    position: 'fixed',
    width: '200px',
    height: '200px',
    color: 'white',
    outline: 'none',
    textAlign: 'center',
    alignItems: "center",
    bottom: 0,
    right: 0,
    transition: 'opacity 0.5s',
    opacity: 1
}