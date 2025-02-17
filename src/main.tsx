import React from "react";
import ReactDOM from "react-dom/client";
import App from './app/App';
import {Provider} from "react-redux"
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
import store from "./store/index"

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);