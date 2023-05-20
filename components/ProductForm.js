import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const uploadIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='h-6 w-6'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
    />
  </svg>
);

export default function ProductForm({
  _id,
  title: exitingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
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
        <div>
          <label>Photo</label>
          <div className='mb-4'>
            <label className='flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-lg border bg-gray-200 text-sm text-gray-500 hover:bg-gray-300'>
              {uploadIcon}
              <span>Upload</span>
              <input type='file' className='hidden' />
            </label>
            {!images?.length && <div>No photos in this product</div>}
          </div>
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
