import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createAPI } from './services/api';
import { configureStore } from '@reduxjs/toolkit';
import { fetchGuitarsAction, fetchMinMaxAction } from './store/api-actions';
import { Provider} from 'react-redux';
import { rootReducer } from './store/root-reducer';
import { BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const INITIAL_FETCH = {
  sortType: null,
  order: 'asc',
  start: null,
  end: null,
  min: null,
  max: null,
  types: [],
  strings: [],
  isLoadData: false,
};


const LIMIT_MESSAGES = 1;
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

store.dispatch(fetchGuitarsAction(INITIAL_FETCH));
store.dispatch(fetchMinMaxAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter >
        <ToastContainer limit ={LIMIT_MESSAGES}/>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
