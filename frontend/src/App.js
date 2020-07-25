import React from 'react';
import Products from "./Components/Products/Products"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from "./Components/Navigation"
import "./Style/App.css"
import Product from "./Components/Product"
import Cart from "./Components/Cart/Cart"

function App() {

  return (
    <div id="root">
      <h1 id="title">Flower Store</h1>
      <Router>
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/products/:name" exact component={Product} />
        </Switch>
        <Navigation />
      </Router>
    </div>
  );
}

export default App;
