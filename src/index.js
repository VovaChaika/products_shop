import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store, {persistor} from './redux/redux_store'
import { PersistGate } from 'redux-persist/integration/react'
import AppContainer from "./AppContainer";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            {/*<PersistGate loading={null} persistor={persistor}>*/}
                <BrowserRouter>
                    <AppContainer/>
                </BrowserRouter>
            {/*</PersistGate>*/}
        </Provider>
);

