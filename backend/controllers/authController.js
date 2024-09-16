const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Secret for JWT (store this securely in an environment variable)
const jwtSecret = '2036325';

// User Registration
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user with default role as 'User'
      const newUser = {
        name,
        email,
        password: hashedPassword,
        role: role || 'Customer', 
      };
      const createdUserArray = await User.createUser(newUser);

      // Assuming createdUserArray is an array with one user object
      const createdUser = createdUserArray[0]; // Access the first element in the array
      console.log(createdUser);
      // Generate JWT
      const token = jwt.sign({ id: createdUser.id, role: createdUser.role }, jwtSecret, { expiresIn: '1h' });
  
      // Set token in cookie (Optional)
      res.cookie('token', token, { httpOnly: true });
  
      // Respond with user data and token
      res.status(201).json({
        message: 'User registered successfully',
        user: { id: createdUser.id, name: createdUser.name, email: createdUser.email, role: createdUser.role },
        token, // Include token in response
      });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err.message });
    }
  };
// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

    // Set token in cookie
    res.cookie('token', token, { httpOnly: true });
       // Respond with user data and token
       res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token, // Include token in response
      });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};



module.exports = {
  register,
  login,

};
