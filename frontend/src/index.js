import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';
import './index.css';
import store from './store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Container>
        <App />
      </Container>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
