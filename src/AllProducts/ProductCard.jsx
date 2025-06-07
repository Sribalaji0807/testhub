import React from 'react'
import { Link } from 'react-router-dom'
const ProductCard = ({ subcategory, subindex, setcart }) => {
  return (
            <div className="w-60  p-4 shadow-lg border-2 rounded-lg" key={subindex}>
              <a className="block relative h-60 rounded overflow-hidden p-1">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block border-2 shadow-md rounded-lg" src={subcategory.images} />
              </a>
              <h2 className="text-gray-900 title-font text-lg font-medium">{subcategory.productName}</h2>
              <p className="mt-1">₹{subcategory.price}</p>
            <div className='flex justify-between'>
                <button className="mt-2  inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                <Link to={`/Buy/${subcategory._id}`}>Buy</Link>
              </button>
               <button
                className="mt-2 inline-flex text-gray-700 bg-gray-100 border-0 py-3 shadow-lg px-3 rounded-full focus:outline-none hover:bg-blue-400 rounded text-lg"
                onClick={() => setcart(subcategory._id)}
              >
<img className='w-6 h-6 object-center' src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1"/>              </button>
 </div> 
            
                       </div>
  )
}

export default ProductCard