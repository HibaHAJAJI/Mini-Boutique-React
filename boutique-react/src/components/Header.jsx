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
      <div className="header-search">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  )
}