import { useState } from 'react'
import initialProducts from './data/products.json'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Footer from './components/Footer'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchSearch
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

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="app">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />

      <main className="main-content">
        <div className="store-layout">
          <div className="catalog-side">
            <ProductList 
              products={filteredProducts} 
              onAddToCart={addToCart} 
              onDeleteProduct={removeProduct} 
            />
          </div>
          <div className="cart-side">
            <Cart 
              cartItems={cart} 
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App