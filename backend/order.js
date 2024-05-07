require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));

const connectDB = require('./db/connect');

// Middleware
app.use(express.json());

// Order router
const orderRouter = require('./routes/orderRoutes');
app.use('/api/orders', orderRouter);

// Error handling middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5002;

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
