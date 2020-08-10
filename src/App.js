'use strict';
import React from 'react';
import './App.css';

import Game from './components/Game';

class App extends React.Component {
 

   

  render() {
    return (
      <div style={{width: '100%', display:'flex',  justifyContent:'center'}}>
     
        <Game />
     
      </div>

    )
  }
}
export default App;
