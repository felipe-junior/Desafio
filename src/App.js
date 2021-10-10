import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Animal from './components/Animal';
import AnimalForm from './components/AnimalForm';
function App() {
  return (
    <div className="App">
       <Animal></Animal>
       <AnimalForm></AnimalForm> 
    </div>
  );
}

export default App;
