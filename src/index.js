import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from "@apollo/client"
import {Provider} from "react-redux";
import store from './redux/redux_store'
import store2 from './redux/redux_store'
import {client} from "./api/api";
import AppContainer from "./AppContainer";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <Provider store={store} store2={store2}>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>
);

