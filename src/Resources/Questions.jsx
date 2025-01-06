import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Topbar from "../Dashboard/Topbar";
import config from "../Access/config";
import { encodeId } from "../Access/Encodedecode";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10); // Entries per page

  useEffect(() => {
    fetchQuestions();
  }, [searchQuery, page, limit]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Resources/fetchquestion.php?search=${searchQuery}&page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (data.success) {
        setQuestions(data.questions);
        setTotal(data.total);
      } else {
        alert("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching questions");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Resources/deletequestion.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Question deleted successfully");
        fetchQuestions(); // Refresh the question list
      } else {
        alert("Failed to delete question");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting question");
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
                  <div className=" fw-bold h4">Question Bank</div>

                  <Link to={"/addquestion"}>
                    <button className="btn-custom">+ Add Question</button>
                  </Link>
                </div>
              </div>
              <hr />
              <div className="row d-flex justify-content-end">
                <div className="col-md-2 ">
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Search Question"
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
                        <th scope="col">Question</th>
                        <th scope="col">Question Type</th>

                        <th scope="col">
                          Class / Subject / Series / Book / Chapter
                        </th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((item, index) => (
                        <tr key={item.question_id} className="text-center">
                          <td>{getSNo(index)}</td>
                          <td>
                            {item.question_title}
                            <br></br>
                            <div style={{ fontSize: "11px" }}>
                              {item.mcq_option_1} {item.mcq_option_2}{" "}
                              {item.mcq_option_3} {item.mcq_option_4}
                            </div>

                            <div style={{ fontSize: "11px" }}>
                              {item.left_match} <br></br> {item.right_match}
                            </div>
                          </td>
                          <td>{item.question_type}</td>

                          <td className="comb">
                            {item.class_name} / {item.subject_name} /{" "}
                            {item.series_name} / {item.book_name} /{" "}
                            {item.chapter_name}
                          </td>
                          <td>
                            <Link
                              to={`/updatequestion/${encodeId(item.id)}`}
                            ></Link>
                            <button
                              className="btn btn-sm "
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="bi bi-trash text-danger fw-bold h5"></i>{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {questions.length === 0 && (
                    <p className="fw-bold">No questions found.</p>
                  )}
                </div>
              </div>
              {/* Pagination */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <div className="fw-bold">
                    Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of{" "}
                    <b>{total}</b> total entries
                  </div>
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

export default Questions;
