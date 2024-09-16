import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../redux/productActions';
import { addItem } from '../redux/cartSlice';
import UpdateProductForm from './UpdateProductForm';

const SweetList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    alert("The product has been added successfully");
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdate = (id, updatedData) => {
    dispatch(updateProduct(id, updatedData));
    setSelectedProduct(null); // Close the modal after updating
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Open the modal with the selected product
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Close the modal
  };

  return (
    <div>
      <div className="h-72 bg-[url('https://wallpapersmug.com/download/1024x768/66383e/choco-cake-food.jpg')] bg-cover bg-center items-center flex justify-center">
        <h1 className="z-50 text-4xl font-bold text-white">Sweets List</h1>
      </div>
      <div className="min-h-screen p-6 ">
        <div className="flex flex-wrap justify-center gap-5 px-20 py-28">
          {status === 'loading' && <p className="text-lg text-gray-600">Loading...</p>}
          {status === 'failed' && <p className="text-lg text-red-600">{error}</p>}
          {status === 'succeeded' && products.map((product) => (
            <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <img src={product.image_url} alt={product.name} className="object-cover w-full p-8 rounded-t-lg h-80" />
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-300' : 'text-gray-200'} dark:text-gray-600`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to Cart
                  </button>
                </div>
                
                {user && user.role == "Admin" && (
                  
                 <div className="flex items-center justify-between mt-5">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Update
                  </button>
                </div>

                )

                 
                }
           
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <UpdateProductForm
          product={selectedProduct}
          onUpdate={handleUpdate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SweetList;
