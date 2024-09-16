import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productActions';
import useAuth from '../hooks/useAuth';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();

  const isAdmin = useAuth('Admin');

  if (!isAdmin) {
    return null; // or return a loading spinner while redirecting
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, price, image_url: imageUrl };
    dispatch(addProduct(newProduct));
    
    setName('');
    setPrice('');
    setImageUrl('');
    alert("Added successfully");
    
  };

  return (
    <div className="min-h-screen p-6 mt-10">
      <h1 className="my-20 mb-4 text-3xl font-bold text-center">Add Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full p-5 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="block w-full p-5 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input
            id="image_url"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="block w-full p-5 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
