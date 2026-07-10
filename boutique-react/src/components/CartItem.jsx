export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)}</p>
        <div className="qty-controls">
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
      </div>
      <button className="btn-remove-item" onClick={() => onRemove(item.id)}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  )
}