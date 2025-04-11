import { useState, useEffect } from 'react';
import './App.css';
import ModalForm from './components/ModalForm.jsx';
import NavBar from './components/NavBar.jsx';
import TableList from './components/TableList.jsx';
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookData, setBookData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (search = '') => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = search
        ? `http://localhost:3000/api/books/search?q=${encodeURIComponent(search)}`
        : 'http://localhost:3000/api/books';
      const response = await axios.get(endpoint);
      setTableData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchBooks(searchTerm);
    } else {
      fetchBooks();
    }
  }, [searchTerm]);

  const handleOpen = (mode, book = null) => {
    setBookData(book);
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = async (newBookData) => {
    setError(null);
    try {
      if (modalMode === 'add') {
        const response = await axios.post('http://localhost:3000/api/books', newBookData);
        setTableData((prevData) => [...prevData, response.data]);
      } else {
        const response = await axios.put(
          `http://localhost:3000/api/books/${bookData.id}`,
          newBookData
        );
        setTableData((prevData) =>
          prevData.map((book) => (book.id === bookData.id ? response.data : book))
        );
      }
      setIsOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save book');
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      {error && (
        <div className="alert alert-error mx-auto max-w-4xl mt-4">{error}</div>
      )}
      {loading ? (
        <div className="text-center mt-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <TableList
          setTableData={setTableData}
          tableData={tableData}
          handleOpen={handleOpen}
          searchTerm={searchTerm}
        />
      )}
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        clientData={bookData}
      />
    </div>
  );
}

export default App;
