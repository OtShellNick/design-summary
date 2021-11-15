import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from "@/store";

import {App} from "@components/App";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
    <>
        <Provider store={store}>
            <App/>
        </Provider>
    </>,
    document.getElementById('root')
);