import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AnimalCreate from "../pages/AnimalCreate/animalCreate";

import Animals from '../pages/Animals/animals';
function App() {
  return (
   <Router> 
     <div className="App">
            <Switch>
              <Route path="/" exact component={Animals}></Route>
              <Route path="/animais" exact component={Animals}></Route>
              <Route path="/animais/criar" component={AnimalCreate}></Route>
              <Route path="/animais/alterar" component={AnimalCreate}></Route>
            </Switch>
       
      </div> 
    </Router>
  );
}

export default App;
