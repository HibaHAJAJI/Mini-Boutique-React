export default function ProductCard({ product, onAddToCart, onDeleteProduct }) {
  const isOutOfStock = product.stock === 0

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="card-media">
        <img src={product.image} alt={product.name} />
        {product.oldPrice && (
          <span className="tag-badge sale">SALE</span>
        )}
        {isOutOfStock && (
          <span className="tag-badge stock">OUT OF STOCK</span>
        )}
        <button className="btn-wishlist">
          <i className="far fa-heart"></i>
        </button>
        {/* Delete button on image */}
        <button 
          className="btn-delete-product"
          onClick={() => onDeleteProduct(product.id)}
          title="Remove from catalog"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="card-footer">
          <div className="card-price">
            ${product.price.toFixed(2)}
            {product.oldPrice && (
              <span style={{ 
                fontSize: '12px', 
                color: '#999', 
                textDecoration: 'line-through',
                marginLeft: '8px'
              }}>
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button 
            className="btn-add-sm" 
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
          >
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '8px',
          fontSize: '11px',
          color: isOutOfStock ? '#e32636' : '#767676'
        }}>
          <span>
            <i className="fas fa-star" style={{ color: '#f5a623', marginRight: '4px' }}></i>
            {product.rating}
          </span>
        </div>
      </div>
    </div>
  )
}