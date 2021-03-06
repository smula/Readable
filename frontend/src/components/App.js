import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import PostDetail from './PostDetail';
import '../App.css';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <Home />
        )}/>
        <Route exact path="/create" render={() => (
          <Create />
        )}/>
        <Route exact path="/:category/posts" render={props => (
          <Home {...props} />
        )}/>
        <Route exact path="/:category/:id" render={props => (
          <PostDetail {...props} />
        )}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
