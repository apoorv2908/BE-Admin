import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import config from '../Access/config';
import Topbar from '../Dashboard/Topbar';
import synclogo from "./Assets/synclogo.png";
import "./Styles/managebookpages.css";
import { decodeId } from '../Access/Encodedecode';

const Managebookpages = () => {
  const { book_id } = useParams();
  const decodedId = decodeId(book_id); // Decode the ID for internal use
  const [bookPages, setBookPages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortOption, setSortOption] = useState('page_number_asc');
  const [editInputs, setEditInputs] = useState({});
  const [bookName, setBookName] = useState('');

  useEffect(() => {
    fetchBookPages();
    fetchBookName();
  }, [searchQuery, page, limit, book_id, sortOption]);

  const fetchBookPages = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/fetchbookpages.php?search=${searchQuery}&page=${page}&limit=${limit}&book_id=${decodedId}&sort=${sortOption}`);
      const data = await response.json();
      if (data.success) {
        setBookPages(data.bookPages);
        setTotal(data.total);
      } else {
        alert('Failed to fetch book pages');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching book pages');
    }
  };

  const fetchBookName = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/fetchbookdetails.php?book_id=${decodedId}`);
      const data = await response.json();
      if (data.success) {
        setBookName(data.book.book_name);
      } else {
        alert('Failed to fetch book details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching book details');
    }
  };

  const handleDeletePage = async (pageId) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/deletebookpage.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page_id: pageId }),
        });
        const data = await response.json();
        if (data.success) {
          alert('Page deleted successfully');
          fetchBookPages();
        } else {
          alert('Failed to delete page');
        }
      } catch (error) {
        console.error('Error deleting page:', error);
        alert('Error deleting page');
      }
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
  };

  const handleNewPageNumberChange = (pageId, value) => {
    setEditInputs((prevInputs) => ({
      ...prevInputs,
      [pageId]: value,
    }));
  };

  const savePageNumber = async (pageId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/updatePageNumber.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_id: pageId,
          new_page_number: editInputs[pageId],
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Page number updated successfully');
        fetchBookPages();
      } else {
        alert('Failed to update page number');
      }
    } catch (error) {
      console.error('Error updating page number:', error);
      alert('Error updating page number');
    }
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
              <div className="row d-flex justify-content-between align-items-center">
                <div className="text-grey fw-bold mb-2 ">Manage Book Pages: {bookName}</div>
                <hr></hr>
                <div className='d-flex justify-content-end gap-3'>
                <div className="col-md-2">
                  <label htmlFor="limitSelect">Show</label>
                  <select
                    id="limitSelect"
                    value={limit}
                    className="form-select d-inline-block mx-1"
                    style={{ width: '90px' }}
                    onChange={handleLimitChange}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  entries
                </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Pages"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">S.no.</th>
                        <th scope="col">Page Title</th>
                        <th scope="col">Page Number</th>
                        <th scope="col">Chapter Name</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Page Image</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookPages.map((item, index) => (
                        <tr key={item.page_id} className={index % 2 === 0 ? 'table-hover' : ''}>
                          <td>{getSNo(index)}</td>
                          <td>{item.page_title}</td>
                          <td className="d-flex">
                            <input
                              type="number"
                              className="form-control small-input"
                              value={editInputs[item.page_id] || item.page_number}
                              onChange={(e) => handleNewPageNumberChange(item.page_id, e.target.value)}
                            placeholder='Enter the preffered page number'
                            />
                            <img
                              src={synclogo}
                              onClick={() => savePageNumber(item.page_id)}
                              className="synclogo cursor mx-2 mt-1"
                              alt="Save"
                            />
                          </td>
                          <td>{item.chapter_name}</td>
                          <td>{item.book_name}</td>
                          <td>
                            {item.image_path && (
                              <img
                                src={`${config.apiBaseUrl}/fullmarks-server/uploads/book_pages/${item.image_path}`}
                                alt="Resource"
                                style={{ width: '50px', height: '50px' }}
                              />
                            )}
                          </td>
                          <td>
                            <Link to={`/updatebookpage/${item.page_id}`}>
                              <button className="btn btn-sm btn-info mr-2 mx-3">Edit</button>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeletePage(item.page_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {bookPages.length === 0 && <p>No book pages found.</p>}
                  <div className="d-flex justify-content-between">
                    <div>
                      Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of <b>{total}</b> total entries
                    </div>
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
  );
};

export default Managebookpages;
