import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import './index.scss';
import  App  from './app';
import configureStore from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);