import { useState, useEffect } from 'react'
import initialProducts from './data/products.json'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Footer from './components/Footer'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

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

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className={`app ${darkMode ? 'dark-mode-active' : ''}`}>
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={totalCartItems}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartItems={cart}
        onRemoveCartItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <main className="main-content">
        <ProductList 
          products={filteredProducts}
          onAddToCart={addToCart}
          onDeleteProduct={removeProduct}
        />
      </main>

      <Footer />
    </div>
  )
}

export default App