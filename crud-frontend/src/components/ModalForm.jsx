import { useState, useEffect } from "react"

export default function ModalForm({ isOpen, onClose, mode, OnSubmit, clientData }) {
    // State for Booksy
    const [readerName, setReaderName] = useState('');
    const [email, setEmail] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Borrowed');

    // Handle status change
    const handleStatusChange = (e) => {
        setStatus(e.target.value); // Borrowed / Returned / Overdue
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const entryData = {
                readerName,
                email,
                bookTitle,
                dueDate,
                status
            };
            await OnSubmit(entryData);
            onClose();
        } catch (err) {
            console.error("Error adding entry", err);
        }
    };

    // Handle edit vs create mode
    useEffect(() => {
        if (mode === 'edit' && clientData) {
            setReaderName(clientData.readerName);
            setEmail(clientData.email);
            setBookTitle(clientData.bookTitle);
            setDueDate(clientData.dueDate);
            setStatus(clientData.status);
        } else {
            // Reset fields
            setReaderName('');
            setEmail('');
            setBookTitle('');
            setDueDate('');
            setStatus('Borrowed');
        }
    }, [mode, clientData]);


    return (




        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Entry' : 'Borrower Details'}</h3>
                    <form method="dialog" onSubmit={handleSubmit}>

                        {/* Reader Name */}
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Reader Name
                            <input
                                type="text"
                                className="grow"
                                value={readerName}
                                onChange={(e) => setReaderName(e.target.value)}
                            />
                        </label>

                        {/* Email */}
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Email
                            <input
                                type="text"
                                className="grow"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        {/* Book Title */}
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Book Title
                            <input
                                type="text"
                                className="grow"
                                value={bookTitle}
                                onChange={(e) => setBookTitle(e.target.value)}
                            />
                        </label>

                        {/* Due Date + Status */}
                        <div className="flex mb-4 justify-between my-4">
                            <label className="input input-bordered mr-4 flex items-center gap-2">
                                Due Date
                                <input
                                    type="date"
                                    className="grow"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </label>

                            <select
                                value={status}
                                className="select select-bordered w-full max-w-xs"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Borrowed</option>
                                <option>Returned</option>
                                <option>Overdue</option>
                            </select>
                        </div>

                        {/* Close & Submit */}
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={onClose}
                        >
                            ✕
                        </button>

                        <button type="submit" className="btn btn-success">
                            {mode === 'edit' ? 'Save Changes' : 'Add Entry'}
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}
