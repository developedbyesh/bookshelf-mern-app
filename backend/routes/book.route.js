import express from 'express';
import {
  createBook,
  getBooks,
  deleteBook,
  updateBook,
} from '../controllers/book.controller.js'; // Assuming you have a controller for handling book-related logic

const router = express.Router();

router.get('/', getBooks); // Assuming getBooks is imported from your controller file

router.post('/', createBook);

router.delete('/:id', deleteBook);

router.put('/:id', updateBook);

export default router;
