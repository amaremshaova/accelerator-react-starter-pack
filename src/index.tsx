import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createAPI } from './services/api';
import { configureStore } from '@reduxjs/toolkit';
import { fetchGuitarsAction } from './store/api-actions';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchGuitarsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
