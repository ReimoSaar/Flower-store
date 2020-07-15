import React from 'react';
import Home from "./Components/Home/Home"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from "./Components/Navigation"
import "./Style/App.css"
import Product from "./Components/Product"

function App() {

  return (
    <div id="root">
      <h1 id="title">Flower Store</h1>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products/:name" exact component={Product} />
        </Switch>
        <Navigation />
      </Router>
    </div>
  );
}

export default App;
