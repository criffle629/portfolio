import React from 'react';
import './App.css';

import Game from './components/Game';

class App extends React.Component {
 
  render() {
    return (
     
        <Game style={{display: 'flex', width: '100%', height: '100%', overflow:'hidden', alignItems:'center'}}/>
     
      
    )
  }
}
export default App;
