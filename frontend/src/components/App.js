import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Home';
import Category from './Category';
import Edit from './Edit';
import Create from './Create';
import PostDetail from './PostDetail';
import '../App.css';
import store from '../store';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Route exact path="/" render={() => (
        <Home />
      )}/>
      <Route exact path="/create" render={() => (
        <Create />
      )}/>
      <Route exact path="/:category" render={() => (
        <Category />
      )}/>
      <Route exact path="/:category/:id" render={() => (
        <PostDetail />
      )}/>
      <Route exact path="/:category/:id/edit" render={() => (
        <Edit />
      )}/>
    </div>
  </Provider>
);

export default App;
