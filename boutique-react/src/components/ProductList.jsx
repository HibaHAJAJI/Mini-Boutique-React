import ProductCard from './ProductCard'

export default function ProductList({ products, onAddToCart, onDeleteProduct }) {
  if (products.length === 0) {
    return <p className="empty-state">No items match your criteria.</p>
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onDeleteProduct={onDeleteProduct}
        />
      ))}
    </div>
  )
}