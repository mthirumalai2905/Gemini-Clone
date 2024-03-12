import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import ContextProvider from './context/context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
