import { useEffect,useState } from "react";
import { useLocation } from 'react-router'
import AddCategory from "./AddCategory";
import ProfilePage from "./ProfilePage";
import Sidebar from "./Sidebar";
import AddProduct from "./AddProduct";
import Cart from "../cart/Cart";
const Dashboard = () => {
    const location=useLocation();
    const [tab,setTab]=useState('');
    const [isAdmin,setIsAdmin]=useState(true);
    useEffect(()=>{
        const temp=new URLSearchParams(location.search);
        const get=temp.get('tab');
        setTab(get);
    },[location.search])
    return (
        <div className="min-h-screen flex flex-col md:flex-row gap-9">
         <div className=" md:w-1/4 lg:w-64">

            <Sidebar/>        
         </div>
            <div className="w-full h-full">
{tab==="profile" && <ProfilePage/>}
{tab==="cart" && <Cart /> }
{tab==="Product" && isAdmin && <AddProduct />}
{tab==="Category" && isAdmin && <AddCategory />}
            </div>
            </div>
    );
};
export default Dashboard;