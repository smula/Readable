import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import '../App.css';

const App = () => (
  <div className="App">
    <Route exact path="/" render={() => (
      <Home />
    )}/>
  </div>
);

export default App;
