import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import initialProducts from './data/products.json';

import Header from './components/Header';
import Footer from './components/Footer';

import Catalogue from './pages/Catalogue';
import AddProduct from './pages/AddProduct';
import NotFound from './pages/NotFound';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  const categories = ['All', 'Women', 'Men', 'Shoes', 'Accessories'];

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      stock: 10,
    };
    setProducts([productWithId, ...products]);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? 'dark-mode-active' : ''}`}>
        
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          cartCount={cartCount}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          cartItems={cartItems}
          onRemoveCartItem={handleRemoveCartItem}
          onUpdateQuantity={handleUpdateQuantity}
        />

        <nav className="pages-nav">
          <NavLink to="/" end>Catalogue</NavLink>
          <NavLink to="/add-product">+ Ajouter Produit</NavLink>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <Catalogue 
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onDeleteProduct={handleDeleteProduct}
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            } />

            <Route path="/add-product" element={
              <AddProduct onAddProduct={handleAddProduct} />
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}