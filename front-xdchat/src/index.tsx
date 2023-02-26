import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import {StompProvider} from "./contexts/stompContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StompProvider>
        <App/>
    </StompProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
