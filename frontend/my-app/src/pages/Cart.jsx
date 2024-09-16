import { useDispatch, useSelector } from 'react-redux';
import { updateItem, removeItem } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateItem({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="container px-4 py-8 mx-auto mt-20">
      <h1 className="mb-6 text-3xl font-bold text-center">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ul className="w-full space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow"
              >
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="object-cover w-16 h-16 rounded-lg" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-lg shadow-md bg-gray-50">
            <h2 className="mb-4 text-2xl font-bold">Summary</h2>
            <p className="text-lg">
              Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </p>
            <p className="text-lg">
              Total Price: $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
