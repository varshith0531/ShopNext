'use client'
import React, { useState } from 'react'

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

export default function ProductForm({
  initial,
  onCreate,
  onUpdate
}: {
  initial?: Product
  onCreate: (payload: Partial<Product>) => void
  onUpdate: (id: string, payload: Partial<Product>) => void
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [desc, setDesc] = useState(initial?.description ?? '')
  const [price, setPrice] = useState(initial?.price ?? 0)
  const [category, setCategory] = useState(initial?.category ?? '')
  const [inventory, setInventory] = useState(initial?.inventory ?? 0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function reset() {
    setName(''); setSlug(''); setDesc(''); setPrice(0); setCategory(''); setInventory(0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload = {
        name,
        slug,
        description: desc,
        price: Number(price),
        category,
        inventory: Number(inventory),
        lastUpdated: new Date().toISOString()
      }
      
      if (initial) {
        await onUpdate(initial.id, payload)
      } else {
        await onCreate(payload)
        reset()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {initial ? 'Edit Product' : 'Add New Product'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Product Name *</label>
              <input 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="form-label">Slug *</label>
              <input 
                required 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)}
                className="form-input"
                placeholder="product-slug"
              />
            </div>
          </div>
          
          <div>
            <label className="form-label">Description *</label>
            <textarea 
              required 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)}
              className="form-textarea"
              rows={3}
              placeholder="Enter product description"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Price (₹) *</label>
              <input 
                type="number" 
                required 
                min="0"
                step="0.01"
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))}
                className="form-input"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="form-label">Category *</label>
              <input 
                required 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                placeholder="e.g., Electronics"
              />
            </div>
            
            <div>
              <label className="form-label">Inventory *</label>
              <input 
                type="number" 
                required 
                min="0"
                value={inventory} 
                onChange={(e) => setInventory(Number(e.target.value))}
                className="form-input"
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`btn ${initial ? 'btn-primary' : 'btn-success'} flex-1`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {initial ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                initial ? 'Update Product' : 'Create Product'
              )}
            </button>
            
            {initial && (
              <button 
                type="button"
                onClick={() => {
                  setName(initial.name)
                  setSlug(initial.slug)
                  setDesc(initial.description)
                  setPrice(initial.price)
                  setCategory(initial.category)
                  setInventory(initial.inventory)
                }}
                className="btn btn-secondary"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
