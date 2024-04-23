import React from 'react'
import './App.css'
import Homepage from './Homepage/Homepage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import BuyingComponent from './BuyingPage/BuyingComponent'
import Loginpage from './Loginpage/Loginpage'
import Cart from './cart/Cart'
function App() {

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>

        
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Buy/:productname/:productimage' element={<BuyingComponent/>}/>

      </Routes>
    </Router>
  )
}

export default App
