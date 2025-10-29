import Link from 'next/link'
import React from 'react'

type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  inventory: number
  lastUpdated: string
}

export default function ProductCard({ product }: { product: Product }) {
  const getStockStatus = (inventory: number) => {
    if (inventory === 0) return { text: 'Out of Stock', class: 'status-low' }
    if (inventory <= 10) return { text: 'Low Stock', class: 'status-medium' }
    return { text: 'In Stock', class: 'status-high' }
  }

  const stockStatus = getStockStatus(product.inventory)

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.class} bg-opacity-10`}>
            {stockStatus.text}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            {product.inventory} units
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <Link 
            href={`/products/${product.slug}`}
            className="btn btn-primary text-sm px-4 py-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
