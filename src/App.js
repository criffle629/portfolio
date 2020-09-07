import React from 'react';
import './App.css';
import Game from './components/Game';
import Loading from './components/Loading';

import { Route } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
   
      <div>
         <Route exact path="/" component = {Loading} />   
         <Route exact path="/game" component = {Game} />  
      </div>
 
    )
  }
}
export default App;
