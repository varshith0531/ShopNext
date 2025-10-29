import React from 'react'
import fs from 'fs'
import path from 'path'
// Product cards are rendered inside the client component
import ClientProductList from './components/ClientProductList'

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

async function getProducts(): Promise<Product[]> {
  const file = path.join(process.cwd(), 'src', 'data', 'products.json')
  const raw = fs.readFileSync(file, 'utf-8')
  return JSON.parse(raw)
}

// This page is a server component and will be rendered at build time.
// It will remain static until redeployed (SSG).
export default async function Home() {
  const products = await getProducts()

  // We will render a client-side search box below — so use a simple component wrapper
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to ShopNext
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Discover amazing products at great prices. Shop with confidence and enjoy fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
              Shop Now
            </button>
            <button className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
          <div className="text-sm text-gray-500">
            {products.length} products available
          </div>
        </div>
        <ClientProductList initialProducts={products} />
      </div>
    </div>
  )
}

// Client component moved to ./components/ClientProductList
