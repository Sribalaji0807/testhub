import React from 'react'
import { Link } from 'react-router-dom'
const ProductCard = ({ subcategory, subindex, setcart }) => {
  return (
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={subindex}>
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={subcategory.images} />
              </a>
              <h2 className="text-gray-900 title-font text-lg font-medium">{subcategory.productName}</h2>
              <p className="mt-1">{subcategory.price}</p>
              <button
                className="mt-2 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                onClick={() => setcart(subcategory._id)}
              >
                Add to cart
              </button>
              <button className="mt-2 ml-8 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                <Link to={`/Buy/${subcategory._id}`}>Buy</Link>
              </button>
            </div>
  )
}

export default ProductCard