import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { defineCustomElements } from 'chart-behavior/loader';
import reportWebVitals from "./reportWebVitals";


ReactDOM.render(
      
            <Provider store={store}>
                        <App />
            </Provider>,
      document.getElementById("root")
	  
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
defineCustomElements(window);
reportWebVitals();
