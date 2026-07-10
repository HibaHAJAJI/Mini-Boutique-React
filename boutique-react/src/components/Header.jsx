export default function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="site-header">
      <div className="logo">
        MAISON<span>.</span>
      </div>
      
      <nav className="nav-links">
        <a href="#" className="active">New In</a>
        <a href="#">Women</a>
        <a href="#">Men</a>
        <a href="#">Shoes</a>
        <a href="#">Accessories</a>
      </nav>

      <div className="header-actions">
        <div className="header-search">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="icon-btn" title="Toggle Dark Mode">
          <i className="far fa-moon"></i>
        </button>
        
        <div className="cart-icon-wrapper">
          <button className="icon-btn" title="View Cart">
            <i className="fas fa-shopping-bag"></i>
          </button>
        </div>
      </div>
    </header>
  );
}