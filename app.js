const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

require('express-async-errors');

const app = express();

dotenv.config({ path: './config.env' });
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

// rootes
app.get('/', (Req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const DB = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const start = async () => {
  try {
    // connectDB
    await connectDB(DB);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
