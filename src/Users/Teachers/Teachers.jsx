import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';
import { encodeId } from '../../Access/Encodedecode';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10); // Entries per page
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, [searchQuery, page, limit, sortOption]);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/fetchteachers.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`);
      const data = await response.json();
      if (data.success) {
        setTeachers(data.teachers);
        setTotal(data.total);
      } else {
        alert('Failed to fetch teachers');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching teachers');
    }
  };

  const handleDelete = async (teacher_id) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/deleteteacher.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher_id }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Teacher deleted successfully');
        fetchTeachers(); // Refresh the teacher list
      } else {
        alert('Failed to delete teacher');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting teacher');
    }
  };

  const handleStatusToggle = async (teacher_id, currentStatus) => {
    const newStatus = currentStatus === 'Enabled' ? 'Disabled' : 'Enabled';
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/toggleteacherstatus.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher_id, status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Teacher ${newStatus === 'Enabled' ? 'enabled' : 'disabled'} successfully`);
        fetchTeachers(); // Refresh the teacher list
      } else {
        alert(`Failed to ${newStatus === 'Enabled' ? 'enable' : 'disable'} teacher`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error ${newStatus === 'Enabled' ? 'enabling' : 'disabling'} teacher`);
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
    <div>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <Topbar />
          {/* Main content */}
          <div className="col-md-12">
            <div className="container mt-3 bg-white shadow-lg p-3 mb-5 bg-white rounded">
              {/* Topbar */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <div className='text-grey h5'>Manage Teachers</div>
                  <Link to={'/addteachers'}><button className="btn btn-primary" >+ Add Teacher</button></Link>
                </div>
              </div>
              <hr />
              <div className="row d-flex justify-content-end">
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control cursor"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              {/* Table */}
              <div className="row mt-3">
                <div className="col-md-12 table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead className='table-secondary'>
                      <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">Teacher Name</th>
                        <th scope="col">Teacher School Name</th>
                        <th scope="col">Teacher Contact Info</th>
                        <th scope="col">Teacher Location Info</th>
                        <th scope="col">Teacher Assigned Books</th>
                        <th scope="col"> Teacher Profile Pic</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((item, index) => (
                        <tr key={item.teacher_id} className={index % 2 === 0 ? ' table-hover' : ''}>
                          <td>{getSNo(index)}</td>
                          <td>{item.teacher_name}</td>
                          <td>{item.school_name}</td>
                          <td className='comb'><b>Email:</b> {item.email}<br /><b>Contact:</b> {item.contact_no}</td>
                          <td className='comb'><b>Country:</b> {item.country}<br /><b>State:</b> {item.state}<br /><b>City:</b> {item.city}</td>
                          <td>{item.assigned_books}</td>
                          <td>

                          {item.profile_pic && (
                              <img style = {{borderRadius: "50%", width: '70px' }} src={`${config.apiBaseUrl}/fullmarks-server/uploads/teachers/${item.profile_pic}`} alt="No Image"  />
                            )}

                            

                          </td>
                          <td>
                            <button
                              className={`btn btn-sm ${item.status === 'Enabled' ? 'btn-warning' : 'btn-success'}`}
                              onClick={() => handleStatusToggle(item.teacher_id, item.status)}
                            >
                              {item.status === 'Enabled' ? 'Disable' : 'Enable'}
                            </button>
                          </td>
                          <td>
  <Link to={`/updateteacher/${encodeId(item.teacher_id)}`}>
    <button className="btn btn-sm btn-secondary">
     Edit
    </button>
  </Link>
  <br />
  <Link to={`/assignbookteacher/${encodeId(item.teacher_id)}`}>
    <button className="btn btn-sm btn-secondary mt-1">
      Assign Books
    </button>
  </Link>
  <br />
  <button
    className="btn btn-sm btn-danger mt-1"
    onClick={() => handleDelete(item.teacher_id)}
  >
    Delete
  </button>
</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {teachers.length === 0 && <p>No teachers found.</p>}
                  <div className='d-flex justify-content-between'>
                    <div>
                      Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of <b>{total}</b> total entries
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12 text-right">
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
              {/* Pagination */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
