import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../Access/config';
import Topbar from '../Dashboard/Topbar';
import { encodeId } from '../Access/Encodedecode';

const Bookpages = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, page, limit, sortOption]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchbooks.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`);
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
        setTotal(data.total);
      } else {
        alert('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching books');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setPage(1);
  };

  const getSNo = (index) => {
    return (page - 1) * limit + index + 1;
  };

  const firstEntry = (page - 1) * limit + 1;
  const lastEntry = Math.min(page * limit, total);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Topbar />
          <div className="col-md-12">
            <div className="container mt-3 bg-white shadow-lg p-3 mb-5 bg-white rounded">
              <div className="d-flex justify-content-between">
                  <div className='text-grey h5'>Manage Book Pages</div>
                  <div>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Search by book name"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  </div>
                  <hr></hr>
                  <p className= 'text-success text-italic'>*List of all the added books are fetched in the list. Select a book to add the pages</p>

              <div className="row mt-3">
                <div className="col-md-12">
                  <table className="table  table-bordered table-responsive">
                  <thead className='table-light'>
                  <tr>
                        <th scope="col">S.no.</th>
                        <th scope="col">Book Name </th>
                        <th scope="col">Class</th>
                        <th scope="col">Subject Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((item, index) => (
                        <tr key={item.book_id} className={index % 2 === 0 ? ' table-hover' : ''}>
                          <td>{getSNo(index)}</td>
                          <td>{item.book_name}</td>
                          <td>{item.class_name}</td>
                          <td>{item.subject_name}</td>
                          <td>
                            <Link to={`/managebookpages/${encodeId(item.book_id)}`}>
                              <button className="btn btn-sm btn-primary mr-2 mx-3">
                                Manage Book Pages
                              </button>
                            </Link>
                            <Link to={`/addbookpages/${encodeId(item.book_id)}`}>
                              <button className="btn btn-sm btn-warning mr-2 mx-3">
                                + Add Pages
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {books.length === 0 && <p>No books found.</p>}
                  <div className='d-flex justify-content-between'>
                    <div>
                      Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of <b>{total}</b> total entries
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <nav>
                          <ul className="pagination">
                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                              <button className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</button>
                            </li>
                            {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                              <li key={index + 1} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                  {index + 1}
                                </button>
                              </li>
                            ))}
                            <li className={`page-item ${page === Math.ceil(total / limit) ? 'disabled' : ''}`}>
                              <button className="page-link" onClick={() => handlePageChange(page + 1)}>Next</button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookpages;
