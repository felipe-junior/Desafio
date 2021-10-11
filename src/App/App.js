import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { NavWrapper, Header } from "./App.style";
import AnimalCreate from "../pages/AnimalCreate/animalCreate";

import Animals from '../pages/Animals/animals';
function App() {
  return (
   <Router> 
     <div className="App">
            <Header>

            <NavWrapper>
              <Link to="/animais">Animais</Link>
            </NavWrapper>
            </Header>

            <Switch>
              <Route path="/" exact component={Animals}></Route>
              <Route path="/animais" exact component={Animals}></Route>
              <Route path="/animais/criar" component={AnimalCreate}></Route>

            </Switch>
       
      </div> 
    </Router>
  );
}

export default App;
