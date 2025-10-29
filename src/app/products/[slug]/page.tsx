import fs from 'fs'
import path from 'path'
import React from 'react'
import Link from 'next/link'

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

export const revalidate = 60 // ISR: re-generate at most every 60 seconds

async function getProductBySlug(slug: string): Promise<Product | null> {
  const file = path.join(process.cwd(), 'src', 'data', 'products.json')
  const raw = fs.readFileSync(file, 'utf-8')
  const products: Product[] = JSON.parse(raw)
  return products.find((p) => p.slug === slug) ?? null
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) {
    return <div><h2>Product not found</h2><Link href="/">Back</Link></div>
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Inventory:</strong> {product.inventory}</p>
      <p>{product.description}</p>
      <p><em>Last updated: {new Date(product.lastUpdated).toLocaleString()}</em></p>
      <Link href="/">Back to products</Link>
    </div>
  )
}
