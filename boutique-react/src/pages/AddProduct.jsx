import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { productSchema } from '../validation/productSchema';

export default function AddProduct({ onAddProduct }) {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema)
  });

  const onSubmit = (data) => {
    onAddProduct(data);
    navigate('/catalogue'); 
  };

  return (
    <div className="form-container">
      <h2>Ajouter un nouveau produit</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        
        <div className="form-group">
          <label>Nom du produit</label>
          <input type="text" {...register("name")} />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Prix ($)</label>
          <input type="number" step="0.01" {...register("price")} />
          {errors.price && <p className="error-msg">{errors.price.message}</p>}
        </div>

        <div className="form-group">
          <label>Catégorie</label>
          <select {...register("category")}>
            <option value="">Sélectionnez une catégorie</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
          </select>
          {errors.category && <p className="error-msg">{errors.category.message}</p>}
        </div>

        <div className="form-group">
          <label>URL de l'image</label>
          <input type="text" {...register("image")} />
          {errors.image && <p className="error-msg">{errors.image.message}</p>}
        </div>

        <button type="submit" className="btn-submit">Ajouter le produit</button>
      </form>
    </div>
  );
}