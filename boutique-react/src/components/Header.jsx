import { useState, useEffect } from 'react';
import Cart from './Cart';

export default function Header({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  cartCount,
  darkMode,
  setDarkMode,
  cartItems,
  onRemoveCartItem,
  onUpdateQuantity
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const menuItems = [
    { name: 'New In', value: 'All' },
    { name: 'Women', value: 'women' },
    { name: 'Men', value: 'men' },
    { name: 'Shoes', value: 'shoes' },
    { name: 'Accessories', value: 'accessories' }
  ];

  return (
    <header className="site-header">
      <div className="logo" onClick={() => setSelectedCategory('All')} style={{ cursor: 'pointer' }}>
        MAISON<span>.</span>
      </div>
      
      <nav className="nav-links">
        {menuItems.map((item) => (
          <a 
            key={item.name}
            href="#" 
            className={selectedCategory.toLowerCase() === item.value.toLowerCase() ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory(item.value);
            }}
          >
            {item.name}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <div className="header-search">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          className="icon-btn" 
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Dark Mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>
        
        <div className="cart-trigger-container">
          <div className="cart-icon-wrapper" onClick={() => setIsOpen(true)}>
            <button className="icon-btn" title="View Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </button>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </div>

      <div className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`cart-dropdown-wrapper ${isOpen ? 'open' : ''}`}>
        <Cart 
          cartItems={cartItems}
          onRemove={onRemoveCartItem}
          onUpdateQuantity={onUpdateQuantity}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </header>
  );
}