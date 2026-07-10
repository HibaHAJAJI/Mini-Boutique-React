export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        
        <div className="cart-item-row">
          <div className="qty-controls">
            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>

      <button className="btn-remove-item" onClick={() => onRemove(item.id)} aria-label="Remove item">
        &times;
      </button>
    </div>
  )
}