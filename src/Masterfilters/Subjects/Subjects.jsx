import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from "../../Access/config"
import { encodeId } from '../../Access/Encodedecode';

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      searchQuery: '',
      page: 1,
      total: 0,
      limit: 10,
      sortOption: '',
    };
  }

  componentDidMount() {
    this.fetchSubjects();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, limit, sortOption } = this.state;
    if (
      searchQuery !== prevState.searchQuery ||
      page !== prevState.page ||
      limit !== prevState.limit ||
      sortOption !== prevState.sortOption
    ) {
      this.fetchSubjects();
    }
  }

  fetchSubjects = async () => {
    const { searchQuery, page, limit, sortOption } = this.state;
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/fetchsubjects.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`);
      const data = await response.json();
      if (data.success) {
        this.setState({ subjects: data.subjects, total: data.total });
      } else {
        alert('Failed to fetch subjects');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching subjects');
    }
  };

  handleDelete = async (subject_id) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/deletesubjects.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject_id }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Subject deleted successfully');
        this.fetchSubjects(); // Refresh the subjects list
      } else {
        alert('Failed to delete subject');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting subject');
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value, page: 1 });
  };

  handleLimitChange = (e) => {
    this.setState({ limit: parseInt(e.target.value), page: 1 });
  };

  handlePageChange = (newPage) => {
    this.setState({ page: newPage });
  };

  handleSortChange = (e) => {
    this.setState({ sortOption: e.target.value, page: 1 });
  };

  getSNo = (index) => {
    const { page, limit } = this.state;
    return (page - 1) * limit + index + 1;
  };

  render() {
    const { subjects, searchQuery, page, total, limit, sortOption } = this.state;
    const firstEntry = (page - 1) * limit + 1;
    const lastEntry = Math.min(page * limit, total);

    return (
      <div id="subjects">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <Topbar />
            {/* Main content */}
            <div className="col-md-12">
              <div className="container mt-3 bg-light shadow-lg p-3 mb-5 bg-white rounded">
                {/* Topbar */}
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between">
                  <div className='text-dark h5'>Manage Subjects</div>
                    <Link to={'/addsubjects'}><button className="btn btn-primary">+ Add Subject</button></Link>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className='d-flex justify-content-end gap-3'>
                    
                    <div className="col-md-2">
                      <input
                        type="text"
                        className="form-control cursor"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Table */}
                <div className="row mt-3">
                  <div className="col-md-12 table responsive">
                    <table className="table table table-sm table-bordered">
                      <thead className= 'table-light'>
                        <tr>
                          <th scope="col">S.no.</th>
                          <th scope="col">Subjects</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.map((subject, index) => (
                          <tr key={subject.subject_id}>
                            <td>{index+1}</td>
                            <td>{subject.subject_name}</td>
                            <td>
                              <Link to={`/updatesubject/${encodeId(subject.subject_id)}`}>

                                <button className="btn btn-sm btn-info mr-2 mx-3">
                                  Edit
                                </button>
                              </Link>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => this.handleDelete(subject.subject_id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {subjects.length === 0 && <p>No subjects found.</p>}
                    <div className='d-flex justify-content-between'>
                      <div>
                        Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of <b>{total}</b> total entries
                      </div>
                      <div>
                        <div className="row mt-3">
                          <div className="col-md-12 text-right">
                            <nav>
                              <ul className="pagination">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                  <button className="page-link" onClick={() => this.handlePageChange(page - 1)}>Previous</button>
                                </li>
                                {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                                  <li key={index + 1} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => this.handlePageChange(index + 1)}>
                                      {index + 1}
                                    </button>
                                  </li>
                                ))}
                                <li className={`page-item ${page === Math.ceil(total / limit) ? 'disabled' : ''}`}>
                                  <button className="page-link" onClick={() => this.handlePageChange(page + 1)}>Next</button>
                                </li>
                              </ul>
                            </nav>
                          </div>
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
  }
}

export default Subjects;
