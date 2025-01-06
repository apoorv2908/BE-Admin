import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";
import { encodeId } from "../../Access/Encodedecode";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10); // Entries per page
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [searchQuery, page, limit, sortOption]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Users/Students/fetchstudents.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`
      );
      const data = await response.json();
      if (data.success) {
        setStudents(data.students);
        setTotal(data.total);
      } else {
        alert("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching students");
    }
  };

  const handleDelete = async (student_id) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Users/Students/deletestudent.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ student_id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Student deleted successfully");
        fetchStudents(); // Refresh the student list
      } else {
        alert("Failed to delete student");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting student");
    }
  };

  const handleStatusToggle = async (student_id, currentStatus) => {
    const newStatus = currentStatus === "Enabled" ? "Disabled" : "Enabled";
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Users/Students/togglestudentstatus.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ student_id, status: newStatus }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert(
          `Student ${
            newStatus === "Enabled" ? "enabled" : "disabled"
          } successfully`
        );
        setStudents(
          students.map((student) =>
            student.student_id === student_id
              ? { ...student, status: newStatus }
              : student
          )
        ); // Update the status in the local state
      } else {
        alert(
          `Failed to ${newStatus === "Enabled" ? "enable" : "disable"} student`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Error ${newStatus === "Enabled" ? "enabling" : "disabling"} student`
      );
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
              style={{ boxShadow: "0px 0px 5px lightgrey" }}
            >
              {" "}
              {/* Topbar */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <div className=" fw-bold h4">Students</div>
                  <Link to={"/addstudents"}>
                    <button className="btn-custom">+ Add Student</button>
                  </Link>
                </div>
              </div>
              <hr />
              <div className="row d-flex justify-content-end">
                <div className="col-md-2">
                  <input
                    type="text"
                    className="custom-input cursor"
                    placeholder="Search Student...."
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
                        <th scope="col">S.no</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">School Name</th>
                        <th scope="col"> Contact </th>
                        <th scope="col"> Location Info</th>
                        <th scope="col"> Assigned Books</th>
                        <th scope="col"> Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((item, index) => (
                        <tr key={item.student_id} className="text-center">
                          <td>{getSNo(index)}</td>
                          <td>{item.student_name}</td>
                          <td>{item.school_name}</td>
                          <td>
                            {item.email}
                            <br></br>
                            {item.contact_no}
                          </td>
                          <td>
                            {item.country}-{item.state}-{item.city}
                          </td>
                          <td>{item.assigned_books}</td>

                          <td>
                            <button
                              className={`btn ${
                                item.status === "Enabled" ? "btn " : "btn"
                              }`}
                              onClick={() =>
                                handleStatusToggle(item.student_id, item.status)
                              }
                            >
                              {item.status === "Enabled" ? (
                                <i class="bi bi-person-check-fill text-success h5"></i>
                              ) : (
                                <i class="bi bi-person-fill-slash text-danger h5"></i>
                              )}
                            </button>
                          </td>
                          <td>
                            <Link
                              to={`/updatestudents/${encodeId(
                                item.student_id
                              )}`}
                            >
                              <button className="btn btn-sm fw-bold">
                                <i className="bi bi-pencil text-primary fw-bold h5"></i>
                              </button>
                            </Link>
                            <Link
                              to={`/assignbookstudent/${encodeId(
                                item.student_id
                              )}`}
                            >
                              <button className=" btn btn-sm fw-bold">
                                <i class="bi bi-book text-secondary fw-bold h5"></i>
                              </button>
                            </Link>
                            <button
                              className="btn btn-sm fw-bold "
                              onClick={() => handleDelete(item.student_id)}
                            >
                              <i className="bi bi-trash text-danger fw-bold h5"></i>{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {students.length === 0 && <p>No students found.</p>}
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">
                      Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of{" "}
                      <b>{total}</b> total entries
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12 text-right">
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
                                  className={`page-item  ${
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
