import express from 'express';
import * as bookController from '../controllers/bookController.js';

const router = express.Router();

// Get all book borrowing entries
router.get('/books', bookController.getEntries);

// Add a new borrowing entry
router.post('/books', bookController.createEntry);

// Update a borrowing entry
router.put('/books/:id', bookController.updateEntry);

// Delete a borrowing entry
router.delete('/books/:id', bookController.deleteEntry);

// Search borrowing entries
router.get('/books/search', bookController.searchEntries);

export default router;
