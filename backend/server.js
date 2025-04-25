import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Ensure this path is correct based on your project structure
import router from './routes/book.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/api/books', router); // Use the book routes defined in book.route.js

app.listen(PORT, () => {
  connectDB(); // Ensure this function is defined in your db.js file
  console.log('Server is running on http://localhost:' + PORT);
});
