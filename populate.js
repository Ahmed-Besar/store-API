const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

dotenv.config({ path: './config.env' });

const DB = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const start = async () => {
  try {
    await connectDB(DB);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('Data is loaded successfully');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
