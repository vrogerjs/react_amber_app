import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";
import {
  Backdrop, CircularProgress
} from '@mui/material';
import { http } from 'gra-react-utils';


http.baseURL = import.meta.env.VITE_APP_BASE_URL;

function counterReducer(state:any = {title:'',networkStatus:{},drawer:false, url:null,load: false, snack: null, cb: null, dialog: null, result: null }, action:any) {

  switch (action.type) {
    case 'alert':
    case 'error':
    case 'confirm':
      return {...state,...{ dialog: action.msg ? action : null }}
    case 'appUrlOpen':
      return {...state,...{ url: action.url }}
    case 'networkStatus':
        return {...state,...{ networkStatus: action.status }}
    case 'snack':
      return {...state,...{ snack: action.msg ? action : null }}
    case 'load':
      return {...state,...{ load: !!action.show }}
    case 'drawer':
        return {...state,...{ drawer:'drawer' in action?!!action.drawer:!state.drawer }}
    case 'title':
        return {...state,...{ title: action.title }}
    default:
      if(action.fn){
        //action.fn(db);
      }
      return state
  }
}

let store = createStore(counterReducer)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function VBackdrop() {

  const load = useSelector((state:any) => state.load);

  const dispatch = useDispatch();

  http.loadingMask = (show) => {
    dispatch({ type: 'load', show: show });
  };
  return <Backdrop style={{ zIndex: 100000 }}
    open={!!load} >
    <CircularProgress />
  </Backdrop>;
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
    <VBackdrop />
  </Provider>
</React.StrictMode>,
)
