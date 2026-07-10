import { RiDeleteBinLine } from "react-icons/ri";

export default function ProductCard({ product, onAddToCart, onDeleteProduct }) {
  const isOutOfStock = product.stock === 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="card-media">
        <img src={product.image} alt={product.name} />
        
        <div className="card-media-controls">
          {product.oldPrice && !isOutOfStock ? (
            <span className="tag-badge sale">SALE</span>
          ) : (
            <div />
          )}
          
          <button 
            className="btn-delete-card"
            onClick={() => onDeleteProduct(product.id)}
            aria-label="Delete product"
          >
            <RiDeleteBinLine size={18} />
          </button>
        </div>

        {isOutOfStock && (
          <span className="tag-badge stock">OUT OF STOCK</span>
        )}
      </div>

      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <h3>{product.name}</h3>
        
        <div className="card-rating">
          <i className="fas fa-star"></i>
          <span>{product.rating || '4.8'}</span>
        </div>

        <div className="card-price">
          ${product.price.toFixed(2)}
          {product.oldPrice && (
            <span className="price-old">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="card-actions-row">
          <button 
            className="btn-add-large" 
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
          >
            <i className="fas fa-shopping-bag"></i> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}