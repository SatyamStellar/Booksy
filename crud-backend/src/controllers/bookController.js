import * as bookService from "../services/bookServices.js"

export const getEntries = async (req, res) => {
    try {
        const entries = await bookService.getEntries();
        res.status(200).json(entries);
    } catch (err) {
        console.error('Error fetching entries:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createEntry = async (req, res) => {
    try {
        const entryData = req.body;
        const newEntry = await bookService.createEntry(entryData);
        res.status(200).json(newEntry);
    } catch (err) {
        console.error('Error adding entry:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateEntry = async (req, res) => {
    try {
        const entryId = req.params.id;
        const entryData = req.body;
        const updatedEntry = await bookService.updateEntry(entryId, entryData);
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json(updatedEntry);
    } catch (err) {
        console.error('Error updating entry:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteEntry = async (req, res) => {
    try {
        const entryId = req.params.id;
        const deleted = await bookService.deleteEntry(entryId);
        if (!deleted) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).send();
    } catch (err) {
        console.error('Error deleting entry:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchEntries = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const results = await bookService.searchEntries(searchTerm);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error searching entries:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

