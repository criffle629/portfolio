import React from 'react';
import './App.css';
import Game from './components/Game';
import Loading from './components/Loading';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

class App extends React.Component {

  constructor(props) {
    super();
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }

  render() {
    return (
      <div id='main'>
        <Game />
        <Loading style={{ position: 'absolute', zIndex: 1 }} />
      </div>
    )
  }
}

export default App;
