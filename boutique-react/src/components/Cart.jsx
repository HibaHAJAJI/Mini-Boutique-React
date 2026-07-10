import CartItem from './CartItem'

export default function Cart({ cartItems = [], onRemove, onUpdateQuantity, onClose }) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  
  const freeShippingThreshold = 100
  const neededForFree = freeShippingThreshold - subtotal
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0.00 : 6.99
  const totalPrice = subtotal + shippingFee
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100)

  return (
    <aside className="shopping-cart">
      <div className="cart-header">
        <h3>Your Bag ({totalItems})</h3>
        <button className="close-cart-btn" onClick={onClose} aria-label="Close Cart">&times;</button>
      </div>

      <div className="shipping-promo">
        {neededForFree > 0 && subtotal > 0 ? (
          <span>Add <strong>${neededForFree.toFixed(2)}</strong> more for free shipping</span>
        ) : subtotal >= freeShippingThreshold ? (
          <span>You qualify for <strong>FREE SHIPPING!</strong></span>
        ) : (
          <span>Add <strong>$100.00</strong> more for free shipping</span>
        )}
        <div className="promo-bar-bg">
          <div className="promo-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="cart-items-wrapper">
        {cartItems.length === 0 ? (
          <p className="cart-empty-msg">Your cart is currently empty.</p>
        ) : (
          cartItems.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="price-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="price-row">
          <span>Shipping</span>
          <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
        </div>
        <div className="price-row total">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="btn-checkout">Checkout</button>
      </div>
    </aside>
  )
}