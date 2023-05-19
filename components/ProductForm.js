import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProductForm({
  _id,
  title: exitingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const initialValue = {
    title: exitingTitle ?? '',
    description: existingDescription ?? '',
    price: existingPrice ?? '',
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
    if (_id) {
      // update product
      await axios.put(`/api/products`, { _id, ...dataProduct });
    } else {
      // create product
      await axios.post(`/api/products`, dataProduct);
    }
    router.push('/products');
  };

  return (
    <>
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
    </>
  );
}
