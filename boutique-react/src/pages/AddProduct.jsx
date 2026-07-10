import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const productSchema = yup.object().shape({
  name: yup.string().required("Le nom du produit est obligatoire"),
  price: yup.number()
    .typeError("Le prix doit être un nombre valide")
    .required("Le prix est obligatoire")
    .positive("Le prix doit être supérieur à 0"),
  category: yup.string().required("La catégorie est obligatoire"),
  image: yup.string().url("L'URL de l'image doit être valide").required("L'URL de l'image est obligatoire")
})

export default function AddProduct({ onAddProduct }) {
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema)
  })

  const onSubmit = (data) => {
    onAddProduct(data)
    navigate('/')
  }

  return (
    <div className="form-container">
      <h2>Ajouter un nouveau produit</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        <div className="form-group">
          <label>Nom du produit</label>
          <input type="text" {...register('name')} className={errors.name ? 'input-error' : ''} />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Prix ($)</label>
          <input type="text" {...register('price')} className={errors.price ? 'input-error' : ''} />
          {errors.price && <span className="error-message">{errors.price.message}</span>}
        </div>

        <div className="form-group">
          <label>Catégorie</label>
          <select {...register('category')} className={errors.category ? 'input-error' : ''}>
            <option value="">Sélectionner une catégorie</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
          {errors.category && <span className="error-message">{errors.category.message}</span>}
        </div>

        <div className="form-group">
          <label>URL de l'image</label>
          <input type="text" {...register('image')} className={errors.image ? 'input-error' : ''} />
          {errors.image && <span className="error-message">{errors.image.message}</span>}
        </div>

        <button type="submit" className="btn-submit-form">Créer le produit</button>
      </form>
    </div>
  )
}