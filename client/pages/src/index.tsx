import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

export default function RootApp() {
  return (
    <BrowserRouter>
       <App />
    </BrowserRouter>
  )
}
