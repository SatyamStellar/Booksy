export default function NavBar({ onOpen, onSearch }) {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="navbar bg-base-100 p-4">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Booksy</a>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        onChange={handleSearchChange}
                        className="input input-bordered w-48 md:w-96"
                    />
                </div>
            </div>
            <div className="navbar-end">
                <button className="btn btn-primary" onClick={onOpen}>
                    Add Book
                </button>
            </div>
        </div>
    );
}
