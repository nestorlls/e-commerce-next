import Layout from '@/components/Layout';
import { useState } from 'react';

export default function New() {
  const initialValue = {
    title: '',
    description: '',
    price: '',
  };
  
  const [dataProduct, setDataProduct] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataProduct({
      ...dataProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hola', dataProduct);
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
        <button className='btn-primary' onSubmit={handleSubmit}>
          Save
        </button>
      </form>
    </Layout>
  );
}
