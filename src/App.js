import React from 'react';
import './App.css';
import Game from './components/Game';
import Loading from './components/Loading';

class App extends React.Component {

  render() {
    return (
      <div>
         <Game/> 
         <Loading style={{position: 'absolute', zIndex:1}}/>  
      </div>
 
    )
  }
}
export default App;
