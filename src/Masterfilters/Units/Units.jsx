import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';
import { encodeId } from '../../Access/Encodedecode';

const Units = () => {
  const [units, setUnits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10); // Entries per page
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    fetchUnits();
  }, [searchQuery, page, limit, sortColumn, sortOrder]);

  const fetchUnits = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Units/fetchunits.php?search=${searchQuery}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
      const data = await response.json();
      if (data.success) {
        setUnits(data.units);
        setTotal(data.total);
      } else {
        alert('Failed to fetch units');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching units');
    }
  };

  const handleDelete = async (unit_id) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Units/deleteunit.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unit_id }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Unit deleted successfully');
        fetchUnits(); // Refresh the units list
      } else {
        alert('Failed to delete unit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting unit');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page on new search
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1); // Reset to the first page on limit change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const getSNo = (index) => {
    return (page - 1) * limit + index + 1;
  };

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      if (sortOrder === 'asc') {
        return ' ↑';
      } else {
        return ' ↓';
      }
    }
    return '';
  };

  const firstEntry = (page - 1) * limit + 1;
  const lastEntry = Math.min(page * limit, total);

  return (
    <div >
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <Topbar />
          {/* Main content */}
          <div className="col-md-12">
              {/* Topbar */}
              <div className="container mt-3 bg-white shadow-lg p-3 mb-5 bg-white rounded">

              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                <div className='text-grey h5'>Manage Units</div>
                  <Link to={'/addunits'}><button className="btn btn-primary">+ Add Unit</button></Link>
                </div>
              </div>
              <hr />
              <div className="row d-flex justify-content-end">
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by unit title"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              {/* Table */}
              <div className="row mt-3">
                <div className="col-md-12">
                  <table className="table table table-sm  table-bordered">
                    <thead className= 'table-light'>
                      <tr>
                        <th
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('sno')}
                        >
                          S.no {renderSortIcon('sno')}
                        </th>
                        <th
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('unit_title')}
                        >
                          Unit Title {renderSortIcon('unit_title')}
                        </th>
                        <th
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('class_name')}
                        >
                          Class Name {renderSortIcon('class_name')}
                        </th>
                        <th
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('subject_name')}
                        >
                          Subject Name {renderSortIcon('subject_name')}
                        </th>
                        <th
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('series_name')}
                        >
                          Series Name {renderSortIcon('series_name')}
                        </th>
                        <th
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('book_name')}
                        >
                          Book Name {renderSortIcon('book_name')}
                        </th>
                        <th
                          scope="col"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSort('section_name')}
                        >
                          Section Name {renderSortIcon('section_name')}
                        </th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {units.map((item, index) => (
                        <tr key={item.unit_id} className={index % 2 === 0 ? ' table-hover' : ''}>
                          <td>{index+1}</td>
                          <td>{item.unit_title}</td>
                          <td>{item.class_name}</td>
                          <td>{item.subject_name}</td>
                          <td>{item.series_name}</td>
                          <td>{item.book_name}</td>
                          <td>{item.section_name}</td>
                          <td>
                            <Link to={`/updateunit/${encodeId(item.unit_id)}`}>
                              <button className="btn btn-sm btn-info mr-2 mx-3">
                                Edit
                              </button>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(item.unit_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {units.length === 0 && <p>No units found.</p>}
                  
                </div>
              </div>
              {/* Pagination */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                <div>
                    Showing {firstEntry} to {lastEntry} of {total} total entries
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
  );
};

export default Units;
