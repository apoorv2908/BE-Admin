import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Dashboard/Sidebar";
import Header from "../../Dashboard/Header";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";
import { encodeId } from "../../Access/Encodedecode";

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10); // Entries per page
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchSections();
  }, [searchQuery, page, limit, sortOption]);

  const fetchSections = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/fetchsections.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`
      );
      const data = await response.json();
      if (data.success) {
        setSections(data.sections);
        setTotal(data.total);
      } else {
        alert("Failed to fetch sections");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching sections");
    }
  };

  const handleDelete = async (section_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete section ?"
    );

    if (!isConfirmed) {
      // If user clicks 'Cancel', do nothing and return
      return;
    }
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/deletesection.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ section_id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Section deleted successfully");
        fetchSections(); // Refresh the section list
      } else {
        alert("Failed to delete section");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting section");
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
        <div className="row ">
          {/* Sidebar */}
          <Topbar />
          {/* Main content */}
          <div className="col-md-12">
            <div
              className=" container mt-3 mb-3 p-3 bg-white"
              style={{ boxShadow: "0px 0px 7px grey" }}
            >
              {" "}
              {/* Topbar */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <div className=" fw-bold h4">Sections</div>
                  <Link to={"/addsections"}>
                    <button className=" btn-custom">+ Add Section</button>
                  </Link>
                </div>
              </div>
              <hr />
              <div className="row d-flex justify-content-end">
                <div className="col-md-2">
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Search by section"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              {/* Table */}
              <div className="row mt-3">
                <div className="col-md-12 table-responsive">
                  <table className="table table-sm table-bordered ">
                    <thead className="table-secondary">
                      <tr className="text-center" style={{ fontSize: "15px" }}>
                        <th scope="col">S.no.</th>
                        <th scope="col">Section Name </th>
                        <th scope="col">Class Name</th>
                        <th scope="col">Subject Name</th>
                        <th scope="col">Series Name</th>
                        <th scope="col">Book Name </th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sections.map((item, index) => (
                        <tr key={item.section_id} className="text-center">
                          <td>{index + 1}</td>
                          <td>{item.section_name}</td>
                          <td>{item.class_name}</td>
                          <td>{item.subject_name}</td>
                          <td>{item.series_name}</td>
                          <td>{item.book_name}</td>
                          <td>
                            <Link
                              to={`/updatesection/${encodeId(item.section_id)}`}
                            >
                              <button className="btn btn-sm">
                                <i className="bi bi-pencil text-primary fw-bold h5"></i>
                              </button>
                            </Link>
                            <button
                              className="btn btn-sm "
                              onClick={() => handleDelete(item.section_id)}
                            >
                              <i className="bi bi-trash text-danger fw-bold h5"></i>{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {sections.length === 0 && (
                    <p className="fw-bold">No sections found.</p>
                  )}
                </div>
              </div>
              {/* Pagination */}
              <div className="d-flex justify-content-between">
                <div className="fw-bold">
                  Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of{" "}
                  <b>{total}</b> total entries
                </div>
                <div>
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item ${page === 1 ? "disabled" : ""}`}
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
                          page === Math.ceil(total / limit) ? "disabled" : ""
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
      </div>
    </div>
  );
};

export default Sections;
