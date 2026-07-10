import { useState } from 'react'
import initialProducts from './data/products.json'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Footer from './components/Footer'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchSearch && matchCategory
  })

  const addToCart = (product) => {
    if (product.stock === 0) return
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return prev
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="app">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={totalCartItems}
      />

      <main className="main-content">
        <div className="catalog-full-width">
          <ProductList 
            products={filteredProducts} 
            onAddToCart={addToCart} 
            onDeleteProduct={removeProduct}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App