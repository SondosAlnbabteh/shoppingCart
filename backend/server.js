const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);


// Start Server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
