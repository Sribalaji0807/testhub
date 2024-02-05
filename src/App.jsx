import React from 'react'
import './App.css'
import Homepage from './Homepage/Homepage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import BuyingComponent from './BuyingPage/BuyingComponent'
import Loginpage from './Loginpage/Loginpage'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/product' element={<BuyingComponent/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      </Routes>
    </Router>
  )
}

export default App
