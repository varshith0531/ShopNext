'use client'
import React, { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm'

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

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Product | null>(null)
  const ADMIN_KEY = (process.env.NEXT_PUBLIC_ADMIN_KEY) || 'dev-secret' // for demo

  async function fetchProducts() {
    setLoading(true)
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchProducts() }, [])

  async function handleCreate(payload: Partial<Product>) {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': ADMIN_KEY
      },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      await fetchProducts()
      setEditing(null)
      alert('Created')
    } else {
      alert('Failed to create: ' + (await res.text()))
    }
  }

  async function handleUpdate(id: string, payload: Partial<Product>) {
    const res = await fetch(`/api/products-id`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': ADMIN_KEY,
        'x-product-id': id
      },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      await fetchProducts()
      setEditing(null)
      alert('Updated')
    } else {
      alert('Failed to update: ' + (await res.text()))
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-1">Manage your products and inventory</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Admin Key</p>
            <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{ADMIN_KEY}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Products List */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Products</h3>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="loading h-16 rounded"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {products.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{p.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span>₹{p.price.toLocaleString()}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          p.inventory === 0 ? 'bg-red-100 text-red-700' :
                          p.inventory <= 10 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {p.inventory} units
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{p.category}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setEditing(p)}
                      className="btn btn-primary text-sm px-4 py-2"
                    >
                      Edit
                    </button>
                  </div>
                ))}
                {products.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="mt-2">No products found</p>
                    <p className="text-sm">Add your first product to get started</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Form */}
        <div>
          <ProductForm
            key={editing?.id ?? 'new'}
            initial={editing ?? undefined}
            onCreate={(payload) => handleCreate(payload)}
            onUpdate={(id, payload) => handleUpdate(id, payload)}
          />
        </div>
      </div>
    </div>
  )
}
