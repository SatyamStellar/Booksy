import axios from 'axios';
import { useState } from 'react';

export default function TableList({ handleOpen, tableData, setTableData, searchTerm }) {
    const [error, setError] = useState(null);



    // Filter the tableData based on the searchTerm
    const filteredData = tableData.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.job.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/person/${id}`); // API call to delete client
                setTableData((prevData) => prevData.filter(person => person.id !== id)); // Update state
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        }
    };



    return (
        <>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Reader Name</th>
                            <th>Email</th>
                            <th>Book Title</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {filteredData.map((entry) => (
                            <tr key={entry.id}>
                                <th>{entry.id}</th>
                                <td>{entry.readerName}</td>
                                <td>{entry.email}</td>
                                <td>{entry.bookTitle}</td>
                                <td>{entry.dueDate}</td>
                                <td>
                                    <button className={`btn rounded-full w-24 ${entry.status === 'Borrowed' ? `btn-primary` : entry.status === 'Overdue' ? `btn-error` : `btn-outline btn-success`}`}>
                                        {entry.status}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleOpen('edit', entry)} className="btn btn-secondary">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-accent" onClick={() => handleDelete(entry.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
