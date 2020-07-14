import React from 'react';
import Home from "./Components/Home/Home"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from "./Components/About/About"
import Navigation from "./Components/Navigation"
import "./Style/App.css"

function App() {

  return (
    <div id="root">
      <h1 id="title">Flower Store</h1>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
