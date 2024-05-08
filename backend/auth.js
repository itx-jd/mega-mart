
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));


const connectDB = require('./db/connect');

// Import auth routes
const authRoutes = require('./routes/authRoutes');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());

// Mount auth routes
app.use('/auth', authRoutes);


// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5001;

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
