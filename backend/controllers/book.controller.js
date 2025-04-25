import mongoose from 'mongoose';
import Book from '../models/book.model.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}); // Assuming Book is imported from your model file
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createBook = async (req, res) => {
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
};

export const deleteBook = async (req, res) => {
  const { id } = req.params; // Extracting the book ID from the request parameters

  try {
    const deletedBook = await Book.findByIdAndDelete(id); // Assuming Book is imported from your model file
    if (!deletedBook) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: deletedBook });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params; // Extracting the book ID from the request parameters
  const updatedData = req.body; // Assuming you send JSON data in the request body

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }); // Assuming Book is imported from your model file
    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
