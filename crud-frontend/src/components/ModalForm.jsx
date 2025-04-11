import { useState, useEffect } from 'react';

export default function ModalForm({ isOpen, onClose, mode, onSubmit, clientData }) {
    const [reader, setReader] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('BORROWED');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (mode === 'edit' && clientData) {
            setReader(clientData.reader || '');
            setEmail(clientData.email || '');
            setTitle(clientData.title || '');
            setDueDate(clientData.dueDate ? new Date(clientData.dueDate).toISOString().split('T')[0] : '');
            setStatus(clientData.status || 'BORROWED');
        } else {
            setReader('');
            setEmail('');
            setTitle('');
            setDueDate('');
            setStatus('BORROWED');
            setError(null);
        }
    }, [mode, clientData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const entryData = {
                reader,
                email,
                title,
                dueDate: new Date(dueDate).toISOString(),
                status
            };
            await onSubmit(entryData);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit entry');
        }
    };

    return (
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">
                        {mode === 'edit' ? 'Edit Book Entry' : 'New Borrow Entry'}
                    </h3>

                    {error && <div className="alert alert-error mb-4">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Name
                            <input
                                type="text"
                                className="grow"
                                value={reader}
                                onChange={(e) => setReader(e.target.value)}
                                required
                            />
                        </label>

                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Email
                            <input
                                type="email"
                                className="grow"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Book Title
                            <input
                                type="text"
                                className="grow"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>

                        <div className="flex mb-4 justify-between my-4">
                            <label className="input input-bordered mr-4 flex items-center gap-2">
                                Due Date
                                <input
                                    type="date"
                                    className="grow"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                />
                            </label>

                            <select
                                value={status}
                                className="select select-bordered w-full max-w-xs"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="BORROWED">Borrowed</option>
                                <option value="RETURNED">Returned</option>
                                <option value="OVERDUE">Overdue</option>
                            </select>
                        </div>

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
    );
}
