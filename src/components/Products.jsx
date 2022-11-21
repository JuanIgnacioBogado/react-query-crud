import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';

import { deleteProduct, getProducts, updateProduct } from '../api/productsAPI';

export const Products = () => {
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => b.id - a.id)
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log('product deleted!');
      queryClient.invalidateQueries('products');
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log('product uptated!');
      queryClient.invalidateQueries('products');
    }
  });

  console.log('data', data);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return data.map(product => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <button onClick={() => deleteProductMutation.mutate(product.id)}>
        Delete
      </button>
      <input
        type="checkbox"
        id={product.id}
        checked={product.inStock}
        onChange={e =>
          updateProductMutation.mutate({
            ...product,
            inStock: e.target.checked
          })
        }
      />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ));
};
