import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from './shared/Authuser.jsx'
import { StateContextProvider } from './Context/index1.jsx'
import {Provider} from 'react-redux'
import { store } from './shared/Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 
      <Provider store={store}>
    <StateContextProvider>

   
    <App />
    
 
    </StateContextProvider>
      </Provider>
     
  </React.StrictMode>,
)
