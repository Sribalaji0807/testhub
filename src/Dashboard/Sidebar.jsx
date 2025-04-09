import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthUser from '../shared/Authuser';
const Sidebar = () => {
   const {Admin}=useSelector(state=>state.User); 
    console.log(Admin);
  //  const [isAdmin,setIsAdmin]=useState(true);
    return (
    <div className='md:w-1/4'>
        <div className="md:w-[250px] md:h-[100vh]  bg-blue-500 text-white ">
            <ul className=" space-y-5 text-xl flex flex-row justify-center items-center md:flex-col">
                <li className="w-full text-center mt-9 hover:border-b-2  hover:border-white hover:pb-2 relative bottom-2 md:bottom-0  text-2xs md:block "><Link to="/Dashboard?tab=profile" >Profile</Link></li>
                <li className="w-full text-center mt-9 hover:border-b-2 hover:border-white hover:pb-2 text-2xs ">Cart</li>
                <li className="w-full text-center mt-9 hover:border-b-2 hover:border-white hover:pb-2 text-2xs ">Orders</li>
            {Admin && <li className="w-full text-center mt-9 hover:border-b-2 hover:border-white hover:pb-2 text-2xs "><Link to="/Dashboard?tab=Product">Add Product</Link></li>}
            {Admin && <li className="w-full text-center mt-9 hover:border-b-2 hover:border-white hover:pb-2 text-2xs "><Link to="/Dashboard?tab=Category">Add Category</Link></li>}

            </ul>
            </div>
    </div>  
    );
};
export default Sidebar;