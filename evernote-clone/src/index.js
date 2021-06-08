import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, } from "redux";
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { getFirestore, createFirestoreInstance, reduxFirestore } from 'redux-firestore'
import rootReducer from './store/reducers/rootReducer';
import { firebaseConfig } from './config/firebaseConfig'
import firebase from 'firebase/app'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig), // redux bidings for firestore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
const rrfProps = {
  firebase,
  config: firebase,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
