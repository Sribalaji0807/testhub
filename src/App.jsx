import React from 'react'
import './App.css'
import Homepage from './Homepage/Homepage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import BuyingComponent from './BuyingPage/BuyingComponent'
import Loginpage from './Authpage/Loginpage'
import Cart from './cart/Cart'
import Signup from './Authpage/Signup'
import Orders from './Orders/Orders'
import { Navbar } from './navbar/Navbar'
import Dashboard from './Dashboard/Dashboard'
import AddProduct  from './Dashboard/AddProduct'
import AddCategory from './Dashboard/AddCategory'
import IsAdmin from './IsAdmin';
import { IsLogin } from './IsAdmin'
function App() {

  return (
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
<Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Loginpage/>}/>
      <Route element={<IsLogin/>}>
      <Route path='/Cart' element={<Cart/>}/>
<Route path='/myorders' element={<Orders/>} />
      </Route>
      <Route path='/Buy/:id' element={<BuyingComponent/>}/>
<Route path='/Dashboard' element={<Dashboard/>} />  
<Route element={<isAdmin/>}>
<Route path='/Dashboard?tab=Product' element={<AddProduct/>} />
<Route path='/Dashboard?tab=Category' element={<AddCategory/>} />

</Route>    
      </Routes>
    </Router>
  )
}

export default App
