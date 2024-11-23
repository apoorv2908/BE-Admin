import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from "../../Access/config"
import { encodeId } from '../../Access/Encodedecode';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetchClasses();
  }, [searchQuery, page, limit, sortOption]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/fetchclasses.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`);
      
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
        setTotal(data.total);
      } else {
        alert('Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching classes');
    }
  };

  const handleDelete = async (class_id) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/deleteclasses.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class_id }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Class deleted successfully');
        fetchClasses(); // Refresh the classes list
      } else {
        alert('Failed to delete class');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting class');
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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setPage(1); // Reset to the first page on sort change
  };

  const getSNo = (index) => {
    return (page - 1) * limit + index + 1;
  };

  const firstEntry = (page - 1) * limit + 1;
  const lastEntry = Math.min(page * limit, total);

  return (
    <div id="classes">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <Topbar/>
          {/* Main content */}
          <div className="col-md-12">
            <div className="container mt-3 bg-light shadow-lg p-3 mb-5 bg-white rounded">
            <div className="row ">
                <div className="col-md-12 d-flex justify-content-between">
                  <div className='text-dark h5'>Manage Classes</div>
                  <Link to={'/addclasses'}><button className="btn btn-primary"> + Add Class</button></Link>
                </div>
              </div>
            <hr></hr>
              {/* Topbar */}
              
              <div className="row ">
                <div className='d-flex justify-content-end gap-3'>
                  <div className="col-md-32">
                    <input
                      type="text"
                      className="cursor form-control"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="row mt-3">
                <div className="col-md-12 table-responsive">
                  <table className="table table-sm table-bordered table-rounded ">
                    <thead className= 'table-light'>
                      <tr>
                        <th scope="col">S.no.</th>
                        <th scope="col">Class Name </th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.map((cls, index) => (
                        <tr key={cls.class_id} className={index % 2 === 0 ? ' table-hover' : ''}>
                          <td>{index+1}</td>
                          <td>{cls.class_name}</td>
                          <td>
                          <Link to={`/updateclass/${encodeId(cls.class_id)}`}>
                          <button className="btn btn-sm btn-secondary mx-2 ">
                                Edit
                              </button>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger mx-2 "
                              onClick={() => handleDelete(cls.class_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {classes.length === 0 && <p>No classes found.</p>}
                  <div className='d-flex justify-content-between'>
                    <div>
                      Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of <b>{total}</b> total entries
                    </div>
                    <div>
                      <nav>
                        <ul className="pagination">
                          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</button>
                          </li>
                          {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                            <li key={index + 1} className={`page-item ${page === index + 1 ? 'active' : ''}`} >
                              <button className="page-link" onClick={() => handlePageChange(index + 1)} >
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
              {/* Pagination */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
