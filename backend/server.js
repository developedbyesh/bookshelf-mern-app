import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Ensure this path is correct based on your project structure

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
});

app.post('/books', async (req, res) => {
  const book = req.body; // Assuming you send JSON data in the request body

  if (!book.title || !book.author || !book.image || !book.price) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }

  const newBook = new Book(book); // Assuming Book is imported from your model file
  try {
    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    console.error('Error saving book:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(5000, () => {
  connectDB(); // Ensure this function is defined in your db.js file
  console.log('Server is running on http://localhost:5000');
});
