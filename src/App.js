import React from 'react';
import './App.css';

import Game from './components/Game';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class App extends React.Component {

  render() {
    return (
      <Game style={{ width: '100%', height: '100%', padding: 0, margin: 0, overflow: 'hidden' }} />
    )
  }
}
export default App;
