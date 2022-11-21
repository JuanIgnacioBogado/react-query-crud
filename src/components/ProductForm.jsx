import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/productsAPI';

export const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log('product added!');
      queryClient.invalidateQueries('products');
    }
  });

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);

    if (Object.values(product).some(entry => entry.trim() === '')) return;

    product.price = Number(product.price);

    console.log('product', product);
    addProductMutation.mutate({
      ...product,
      inStock: true
    });

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />

      <button type="submit">Add Product</button>
    </form>
  );
};