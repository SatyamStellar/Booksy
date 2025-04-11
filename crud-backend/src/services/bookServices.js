import { query } from "../db.js";

export const getEntries = async () => {
    const { rows } = await query('SELECT * FROM books_tb');
    return rows;
};

export const createEntry = async (entryData) => {
    const { reader, email, title, dueDate, status } = entryData;
    const { rows } = await query(
        `INSERT INTO books_tb (readername, email, booktitle, duedate, status)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [reader, email, title, dueDate, status]
    );
    return rows[0];
};

export const updateEntry = async (entryId, entryData) => {
    const { reader, email, title, dueDate, status } = entryData;
    const { rows } = await query(
        `UPDATE books_tb
         SET readername = $1, email = $2, booktitle = $3, duedate = $4, status = $5
         WHERE id = $6 RETURNING *`,
        [reader, email, title, dueDate, status, entryId]
    );
    return rows[0];
};

export const deleteEntry = async (entryId) => {
    const { rowCount } = await query(`DELETE FROM books_tb WHERE id = $1`, [entryId]);
    return rowCount > 0;
};

export const searchEntries = async (searchTerm) => {
    const { rows } = await query(
        `SELECT * FROM books_tb 
         WHERE readername ILIKE $1 
         OR email ILIKE $1 
         OR booktitle ILIKE $1 
         OR status ILIKE $1`,
        [`%${searchTerm}%`]
    );
    return rows;
};

