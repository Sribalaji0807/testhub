import React from 'react'
import './App.css'
import Homepage from './Homepage/Homepage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import BuyingComponent from './BuyingPage/BuyingComponent'
import Loginpage from './Loginpage/Loginpage'
import Cart from './cart/Cart'
import Orders from './Orders/Orders'
import { Navbar } from './navbar/Navbar'
function App() {

  return (
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>

        
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Buy/:id' element={<BuyingComponent/>}/>
<Route path='/myorders' element={<Orders/>} />
      </Routes>
    </Router>
  )
}

export default App
