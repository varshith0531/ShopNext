import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

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

const DB = path.join(process.cwd(), 'src', 'data', 'products.json')

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const raw = await fs.readFile(DB, 'utf-8')
    const products: Product[] = JSON.parse(raw)
    const product = products.find((p) => p.id === id)
    
    if (!product) {
      return new NextResponse('Product not found', { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (err) {
    return new NextResponse('Server error: ' + String(err), { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = await params
    const updates = await request.json()
    const raw = await fs.readFile(DB, 'utf-8')
    const products: Product[] = JSON.parse(raw)

    const index = products.findIndex((p) => p.id === id)
    if (index === -1) {
      return new NextResponse('Product not found', { status: 404 })
    }

    const updated: Product = {
      ...products[index],
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : products[index].price,
      inventory: updates.inventory !== undefined ? Number(updates.inventory) : products[index].inventory,
      lastUpdated: new Date().toISOString()
    }

    products[index] = updated
    await fs.writeFile(DB, JSON.stringify(products, null, 2), 'utf-8')

    return NextResponse.json(updated)
  } catch (err) {
    return new NextResponse('Server error: ' + String(err), { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = await params
    const raw = await fs.readFile(DB, 'utf-8')
    const products: Product[] = JSON.parse(raw)

    const index = products.findIndex((p) => p.id === id)
    if (index === -1) {
      return new NextResponse('Product not found', { status: 404 })
    }

    products.splice(index, 1)
    await fs.writeFile(DB, JSON.stringify(products, null, 2), 'utf-8')

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    return new NextResponse('Server error: ' + String(err), { status: 500 })
  }
}
