import './App.css';
import React, {Component} from 'react';
import Home from "./HomePage"; //redners out my home page info\
import ProjectPage from "./ProjectPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/"} exact component={Home} />c
          <Route path={"/Stake"} component={ProjectPage} />
          <Route path={"/404"} component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;