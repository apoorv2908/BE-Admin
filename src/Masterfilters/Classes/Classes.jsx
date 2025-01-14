import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";
import { encodeId } from "../../Access/Encodedecode";
import Sidebar from "../../Dashboard/Sidebar";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchClasses();
  }, [searchQuery, page, limit, sortOption]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/fetchclasses.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`
      );

      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
        setTotal(data.total);
      } else {
        alert("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching classes");
    }
  };

  const handleDelete = async (class_id) => {
    // Ask for confirmation before proceeding
    const isConfirmed = window.confirm(
      "Are you sure you want to delete class?"
    );

    if (!isConfirmed) {
      // If user clicks 'Cancel', do nothing and return
      return;
    }

    // Proceed with deletion if confirmed
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/deleteclasses.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ class_id }),
        }
      );
      const data = await response.json();

      if (data.success) {
        alert("Class deleted successfully");
        fetchClasses(); // Refresh the classes list
      } else {
        alert("Failed to delete class");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting class");
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
                  <div className=" fw-bold h4">Classes</div>
                  <Link to={"/addclasses"}>
                    <button className=" btn-custom"> + Add Class</button>
                  </Link>
                </div>
              </div>
              <hr></hr>
              {/* Topbar */}
              <div className="row ">
                <div className="d-flex justify-content-end gap-3">
                  <div className="col-md-32">
                    <input
                      type="text"
                      className="cursor custom-input"
                      placeholder="Search Class..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="row mt-3">
                <div className="col-md-12 table-responsive">
                  <table className="table table-sm table-bordered ">
                    <thead className="table-secondary">
                      <tr className="text-center" style={{ fontSize: "15px" }}>
                        <th scope="col ">S.no.</th>
                        <th scope="col">Class Name </th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.map((cls, index) => (
                        <tr key={cls.class_id} className="text-center">
                          <td>{index + 1}</td>
                          <td>{cls.class_name}</td>
                          <td>
                            <Link to={`/updateclass/${encodeId(cls.class_id)}`}>
                              <button className="btn btn-sm ">
                                <i className="bi bi-pencil text-primary fw-bold h5"></i>
                                {/* Edit Icon */}
                              </button>
                            </Link>
                            <button
                              className="btn btn-sm "
                              onClick={() => handleDelete(cls.class_id)}
                            >
                              <i className="bi bi-trash text-danger fw-bold h5"></i>{" "}
                              {/* Delete Icon */}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {classes.length === 0 && (
                    <p className="fw-bold">No classes found.</p>
                  )}
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">
                      Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of{" "}
                      <b>{total}</b> total entries
                    </div>
                    <div>
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
              {/* Pagination */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
