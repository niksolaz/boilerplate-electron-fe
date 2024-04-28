import React from 'react';
import { render } from 'react-dom';
import App from './App.tsx';
import './index.css';
render(React.createElement(React.StrictMode, null,
    React.createElement(App, null)), document.getElementById('root'));
