import CartItem from './CartItem'

export default function Cart({ cartItems, onRemove, onUpdateQuantity }) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <aside className="shopping-cart">
      <h3>Your Bag ({totalItems})</h3>
      {cartItems.length === 0 ? (
        <p className="cart-empty-msg">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-items-wrapper">
            {cartItems.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
          <div className="cart-total-box">
            <span>Total amount:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </>
      )}
    </aside>
  )
}