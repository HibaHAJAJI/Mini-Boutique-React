import ProductList from '../components/ProductList';
import CategoryFilter from '../components/CategoryFilter';

export default function Catalogue({ products, onAddToCart, onDeleteProduct, categories, selectedCategory, onSelectCategory }) {
  return (
    <>
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={onSelectCategory} 
      />
      <ProductList 
        products={products} 
        onAddToCart={onAddToCart} 
        onDeleteProduct={onDeleteProduct} 
      />
    </>
  );
}