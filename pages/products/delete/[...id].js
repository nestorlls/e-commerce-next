import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DeleteProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/products?id=${id}`)
      .then((response) => setProduct(response.data))
      .catch(console.error);
  }, [id]);

  const goBack = () => {
    router.push('/products');
  };

  const handleDelete = async () => {
    await axios.delete(`/api/products?id=${id}`);
    goBack();
  };

  return (
    <Layout>
      <h1 className='text-center'>
        Do you want to delete product <b>{`"${product?.title}"`}</b>
      </h1>
      <div className='mt-4 flex justify-center gap-2'>
        <button className='btn-red' onClick={() => handleDelete(id)}>
          Yes
        </button>
        <button className='btn-default' onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
