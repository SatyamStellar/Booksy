import * as bookService from '../services/bookServices.js';

export const getEntries = async (req, res) => {
    try {
        const entries = await bookService.getAllEntries();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createEntry = async (req, res) => {
    try {
        const { reader, email, title, dueDate, status } = req.body;

        if (!reader || !email || !title || !dueDate || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!['BORROWED', 'RETURNED', 'OVERDUE'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const newEntry = await bookService.createEntry({
            reader,
            email,
            title,
            dueDate: new Date(dueDate),
            status
        });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error creating entry:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateEntry = async (req, res) => {
    try {
        const entryId = parseInt(req.params.id);
        const { reader, email, title, dueDate, status } = req.body;

        if (isNaN(entryId)) {
            return res.status(400).json({ message: 'Invalid entry ID' });
        }

        const updatedEntry = await bookService.updateEntry(entryId, {
            reader,
            email,
            title,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            status
        });

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(updatedEntry);
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteEntry = async (req, res) => {
    try {
        const entryId = parseInt(req.params.id);

        if (isNaN(entryId)) {
            return res.status(400).json({ message: 'Invalid entry ID' });
        }

        const deleted = await bookService.deleteEntry(entryId);
        if (!deleted) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchEntries = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }
        const results = await bookService.searchEntries(searchTerm);
        res.json(results);
    } catch (error) {
        console.error('Error searching entries:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
