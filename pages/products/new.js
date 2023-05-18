import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function New() {
  const initialValue = {
    title: '',
    description: '',
    price: '',
  };

  const router = useRouter();
  const [dataProduct, setDataProduct] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataProduct({
      ...dataProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/products`, dataProduct);
    router.push('/products');
  };

  return (
    <Layout>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor='title'>Product name</label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Product name'
            value={dataProduct.title}
            onChange={handleChange}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            placeholder='description'
            value={dataProduct.description}
            onChange={handleChange}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='price'>Price (in USD)</label>
          <input
            type='number'
            id='price'
            name='price'
            placeholder='price'
            value={dataProduct.price}
            onChange={handleChange}
          />
        </div>
        <button className='btn-primary' type='submit' onSubmit={handleSubmit}>
          Save
        </button>
      </form>
    </Layout>
  );
}
