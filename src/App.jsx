import React from 'react';
import './App.css';
import Game from './components/Game';
import Loading from './components/Loading';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA7G--IO5uEelHLSnZrN_OLnyDSvLmwa-o",
  authDomain: "portfolio-site-d5126.firebaseapp.com",
  projectId: "portfolio-site-d5126",
  storageBucket: "portfolio-site-d5126.appspot.com",
  messagingSenderId: "107771788914",
  appId: "1:107771788914:web:d6634958b88532c2f88ceb",
  measurementId: "G-WTPHGH8XYM"
};

class App extends React.Component {

  constructor(props) {
    super();
    const app = initializeApp(firebaseConfig);


    // Initialize Analytics and get a reference to the service
    const analytics = getAnalytics(app);

  }

  render() {
    return (
      <div id='main'>


         <Game/> 
         <Loading style={{position: 'absolute', zIndex:1}}/>  


  
      </div>
 
    )
  }
}
export default App;
