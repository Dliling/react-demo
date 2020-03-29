import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducer';
// import ToDoApp from '@components/ToDoApp';
import App from '@components/App';

import './css/index.css';

const store = createStore(rootReducer);

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
