import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authThunks';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  loading, error } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(formData));
    
    if (registerUser.fulfilled.match(resultAction)) {
      // Redirect based on role
      const role = resultAction.payload.user.role;
      if (role === 'Admin') {
        navigate('/AddProductPage'); // Redirect admin to dashboard
      } else {
        navigate('/'); // Redirect customers to shop
      }
    }
  };

  return (
    <section className="mt-10 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                  placeholder="name@company.com" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
              <div className="mt-4">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="Customer">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-gray-950 border-2"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
              </p>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
