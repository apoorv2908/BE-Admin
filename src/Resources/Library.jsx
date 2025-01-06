import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Topbar from "../Dashboard/Topbar";
import config from "../Access/config";

const Library = () => {
  const [libraryResources, setLibraryResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchLibraryResources();
  }, [searchQuery, page, limit, sortOption]);

  const fetchLibraryResources = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Resources/Library/fetchlibrary.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`
      );
      const data = await response.json();
      if (data.success) {
        setLibraryResources(data.libraryResources);
        setTotal(data.total);
      } else {
        alert("Failed to fetch library resources");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching library resources");
    }
  };

  const handleDelete = async (resource_id) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Resources/Library/deletelibrary.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resource_id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Library resource deleted successfully");
        fetchLibraryResources();
      } else {
        alert("Failed to delete library resource");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting library resource");
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
        <div className="row ">
          {/* Sidebar */}
          <Topbar />
          {/* Main content */}
          <div className="col-md-12">
            <div
              className=" container mt-3 mb-3 p-3 bg-white"
              style={{ boxShadow: "0px 0px 5px lightgrey" }}
            >
              {" "}
              {/* Topbar */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <div className=" fw-bold h4">Resources</div>
                  <Link to={"/addresources"}>
                    <button className="btn-custom">+ Add Resource</button>
                  </Link>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="d-flex justify-content-end gap-3">
                  <div className="col-md-2">
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Search by title"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12 table-responsive">
                  <table className="table table-sm table-bordered ">
                    <thead className="table-secondary">
                      <tr className="text-center" style={{ fontSize: "15px" }}>
                        <th scope="col">S.no.</th>
                        <th scope="col">Resource Title</th>
                        <th scope="col">Resource Type</th>
                        <th scope="col">Book - Chapter</th>
                        <th scope="col">Resource Tagged</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {libraryResources.map((item, index) => (
                        <tr key={item.resource_id} className="text-center ">
                          <td>{getSNo(index)}</td>
                          <td>{item.resource_title}</td>
                          <td>{item.resource_type}</td>

                          <td>
                            {item.book_name}
                            <br></br>
                            {item.chapter_name}
                          </td>
                          <td>Yes</td>

                          {/*<td>
  {item.resource_type === 'videos' ? (
    <video width="200" controls>
      <source src={`${config.apiBaseUrl}/fullmarks-server/uploads/videos/${item.video_file}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : item.resource_type === 'documents' || item.resource_type === 'lessonplans' ? (
    <embed src={`${config.apiBaseUrl}/fullmarks-server/uploads/documents/${item.document_file}`} type="application/pdf" style={{ width: '200px', height: '200px' }} />
  ) : item.resource_type === 'audio' ? (
    <audio controls>
      <source src={`${config.apiBaseUrl}/fullmarks-server/uploads/audio/${item.audio_file}`} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  ) : (
    <img src={`${config.apiBaseUrl}/fullmarks-server/uploads/thumbnails/${item.thumb_image}`} alt="Resource" style={{ width: '200px' }} />
  )}
</td>*/}

                          <td>
                            <button
                              className="btn btn-sm "
                              onClick={() => handleDelete(item.resource_id)}
                            >
                              <i className="bi bi-trash text-danger fw-bold h5"></i>{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {libraryResources.length === 0 && (
                    <p>No library resources found.</p>
                  )}
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">
                      Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of{" "}
                      <b>{total}</b> total entries
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <nav>
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                page === 1 ? "disabled" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(page - 1)}
                              >
                                Previous
                              </button>
                            </li>
                            {Array.from(
                              { length: Math.ceil(total / limit) },
                              (_, index) => (
                                <li
                                  key={index + 1}
                                  className={`page-item ${
                                    page === index + 1 ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageChange(index + 1)}
                                  >
                                    {index + 1}
                                  </button>
                                </li>
                              )
                            )}
                            <li
                              className={`page-item ${
                                page === Math.ceil(total / limit)
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(page + 1)}
                              >
                                Next
                              </button>
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

export default Library;
