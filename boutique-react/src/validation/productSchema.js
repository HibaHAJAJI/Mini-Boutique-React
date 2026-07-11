import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string().required("Le nom du produit est obligatoire"),
  price: yup.number()
    .transform((value, originalValue) => originalValue === "" ? undefined : value)
    .typeError("Le prix doit être un nombre")
    .positive("Le prix doit être supérieur à 0")
    .required("Le prix est obligatoire"),
  category: yup.string().required("La catégorie est obligatoire"),
  image: yup.string().url("L'URL de l'image doit être valide").required("L'URL de l'image est obligatoire"),
});