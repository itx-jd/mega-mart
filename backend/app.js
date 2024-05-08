// app.js or server.js

require('dotenv').config();
const cors = require('cors');
require('express-async-errors');
const express = require('express');
const app = express();

app.use(cors({ origin: '*' }));

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const connectDB = require('./db/connect');

// // Import auth routes
const authRoutes = require('./routes/authRoutes');

// product router
const productRouter = require('./routes/productRoutes');

// // order router
const orderRouter = require('./routes/orderRoutes');

// category router
const categoryRouter = require('./routes/categoryRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

// // Mount auth routes
app.use('/auth', authRoutes);

app.use('/api/orders', orderRouter);

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );

    console.log(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

start();
