import axios from 'axios';
import { useState } from 'react';

export default function TableList({ handleOpen, tableData = [], setTableData, searchTerm = '' }) {
    const [error, setError] = useState(null);

    // Filter the tableData based on searchTerm safely
    const filteredData = tableData.filter((entry) => {
        const reader = entry?.reader?.toLowerCase() || '';
        const email = entry?.email?.toLowerCase() || '';
        const title = entry?.title?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();

        return reader.includes(search) || email.includes(search) || title.includes(search);
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book entry?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/books/${id}`);
                setTableData((prevData) => prevData.filter((entry) => entry.id !== id));
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete entry');
            }
        }
    };

    return (
        <>
            {error && <div className="alert alert-error mb-4">{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Reader Name</th>
                            <th>Email</th>
                            <th>Book Title</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {filteredData.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.reader}</td>
                                <td>{entry.email}</td>
                                <td>{entry.title}</td>
                                <td>
                                    {new Date(entry.dueDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td>
                                    <button
                                        className={`btn rounded-full w-24 ${entry.status === 'BORROWED'
                                            ? 'btn-primary'
                                            : entry.status === 'OVERDUE'
                                                ? 'btn-error'
                                                : 'btn-success'
                                            }`}
                                    >
                                        {entry.status}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleOpen('edit', entry)}
                                        className="btn btn-secondary"
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleDelete(entry.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredData.length === 0 && (
                    <div className="text-center mt-4">No entries found</div>
                )}
            </div>
        </>
    );
}
