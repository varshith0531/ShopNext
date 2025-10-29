# ShopNext - Modern E-commerce Platform

A modern, full-stack e-commerce application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. ShopNext provides a complete shopping experience with product management, admin dashboard, and responsive design.

## 🚀 Features

- **Product Catalog**: Browse and search through products with real-time filtering
- **Product Management**: Admin panel for adding, editing, and managing products
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Product Details**: Individual product pages with detailed information
- **Inventory Tracking**: Real-time stock status and inventory management
- **API Routes**: RESTful API for product operations
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: JSON file-based storage (easily replaceable with MongoDB)
- **Package Manager**: npm
- **Development**: ESLint, PostCSS

## 📁 Project Structure

```
e-commerce/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard
│   │   │   └── page.tsx       # Admin product management
│   │   ├── api/               # API routes
│   │   │   ├── products/      # Products API endpoints
│   │   │   │   └── route.ts   # GET/POST products
│   │   │   └── products-id/   # Individual product API
│   │   │       └── route.ts   # GET/PUT/DELETE by ID
│   │   ├── components/        # Reusable components
│   │   │   ├── ClientProductList.tsx  # Client-side product list
│   │   │   ├── ProductCard.tsx        # Product card component
│   │   │   └── ProductForm.tsx        # Product form component
│   │   ├── dashboard/         # User dashboard
│   │   │   └── page.tsx       # Dashboard page
│   │   ├── products/          # Product pages
│   │   │   └── [slug]/       # Dynamic product routes
│   │   │       └── page.tsx   # Individual product page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   └── data/
│       └── products.json      # Product data storage
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/varshith0531/ShopNext.git
   cd ShopNext
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_ADMIN_KEY=your-admin-key-here" > .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages & Routes

- **Home** (`/`) - Product catalog and hero section
- **Dashboard** (`/dashboard`) - User dashboard
- **Admin** (`/admin`) - Product management interface
- **Product Details** (`/products/[slug]`) - Individual product pages
- **API Routes**:
  - `GET /api/products` - Fetch all products
  - `POST /api/products` - Create new product (admin only)
  - `GET /api/products-id/[id]` - Fetch single product
  - `PUT /api/products-id/[id]` - Update product (admin only)
  - `DELETE /api/products-id/[id]` - Delete product (admin only)

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Key Components

- **ProductCard**: Displays product information with stock status
- **ProductForm**: Form for creating/editing products
- **ClientProductList**: Client-side product listing with search/filter
- **Admin Dashboard**: Complete product management interface

## 🎨 Styling

The project uses Tailwind CSS v4 with a custom design system:

- **Colors**: Blue gradient theme with modern color palette
- **Components**: Custom button styles, cards, and layouts
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects

## 📊 Data Management

Currently uses JSON file-based storage (`src/data/products.json`) for simplicity. The structure supports:

- Product CRUD operations
- Inventory tracking
- Category management
- Timestamp tracking

**Note**: For production, consider migrating to a proper database like MongoDB or PostgreSQL.

## 🔐 Authentication

Admin operations require an admin key passed in the `x-admin-key` header. Set this in your environment variables:

```bash
NEXT_PUBLIC_ADMIN_KEY=your-secure-admin-key
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Font optimization with [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

---

**ShopNext** - Modern E-commerce Made Simple 🛍️
