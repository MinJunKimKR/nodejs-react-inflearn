import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers' // /index.js를 안해줘도 자동으로 가져와 준다.

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);//그냥 createStore는 object밖에 못받기 때문에 미들웨어를 추가 해준것이다.

/* 
Provider로 감싸는 방법으로 redux랑 연결해 줄수있다. 
*/
ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSTION__ &&
      window.__REDUX_DEVTOOLS_EXTENSTION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
