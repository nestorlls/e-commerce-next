import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/products?id=${id}`)
      .then((response) => setProduct(response.data));
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {product && <ProductForm {...product} />}
    </Layout>
  );
}
