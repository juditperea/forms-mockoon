import React from 'react';
import ReactDOM from 'react-dom';
import FormApp from './components/FormApp.jsx';
import './index.css';

// Remove the Apollo Client related code

ReactDOM.render(
  <React.StrictMode>
    <FormApp />
  </React.StrictMode>,
  document.getElementById('root')
);
