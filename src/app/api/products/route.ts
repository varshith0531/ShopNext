import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

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

export async function GET() {
  const raw = await fs.readFile(DB, 'utf-8')
  return NextResponse.json(JSON.parse(raw))
}

export async function POST(req: Request) {
  try {
    const adminKey = req.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const raw = await fs.readFile(DB, 'utf-8')
    const products: Product[] = JSON.parse(raw)

    const newProduct: Product = {
      id: uuidv4(),
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      inventory: Number(body.inventory),
      lastUpdated: new Date().toISOString()
    }

    products.push(newProduct)
    await fs.writeFile(DB, JSON.stringify(products, null, 2), 'utf-8')

    return NextResponse.json(newProduct, { status: 201 })
  } catch (err) {
    return new NextResponse('Server error: ' + String(err), { status: 500 })
  }
}
