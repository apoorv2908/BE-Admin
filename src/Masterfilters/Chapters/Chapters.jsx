import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";
import { encodeId } from "../../Access/Encodedecode";
import { useLocation } from "react-router-dom";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10); // Entries per page
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchChapters();
  }, [searchQuery, page, limit, sortOption]);

  const fetchChapters = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Chapters/fetchchapters.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`
      );
      const data = await response.json();
      if (data.success) {
        setChapters(data.chapters);
        setTotal(data.total);
      } else {
        alert("Failed to fetch chapters");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching chapters");
    }
  };

  const handleDelete = async (chapter_id) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Chapters/deletechapters.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chapter_id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Chapter deleted successfully");
        fetchChapters(); // Refresh the chapter list
      } else {
        alert("Failed to delete chapter");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting chapter");
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

  const handleAddQuestion = (chapter) => {
    navigate("/addquestion", {
      state: {
        selectedClass: chapter.class_id,
        selectedSubject: chapter.subject_id,
        selectedSeries: chapter.series_id,
        selectedBook: chapter.book_id,
        selectedChapter: chapter.chapter_id,
        className: chapter.class_name,
        subjectName: chapter.subject_name,
        seriesName: chapter.series_name,
        bookName: chapter.book_name,
        chapterTitle: chapter.chapter_title,
      },
    });
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
                  <div className=" fw-bold h4">Chapters</div>
                  <Link to={"/addchapters"}>
                    <button className="btn-custom">+ Add Chapter</button>
                  </Link>
                </div>
              </div>
              <hr />
              <div className="row d-flex justify-content-end">
                <div className="col-md-2 ">
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Search Chapter......"
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
                        <th scope="col">Chapter Name</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">
                          Class Name - Subject Name - Series Name
                        </th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapters.map((item, index) => (
                        <tr key={item.chapter_id} className="text-center">
                          <td>{getSNo(index)}</td>
                          <td>{item.chapter_title}</td>
                          <td>{item.book_name}</td>
                          <td>
                            {item.class_name} - {item.subject_name} -{" "}
                            {item.series_name}
                          </td>
                          <td>
                            <Link
                              to={`/updatechapter/${encodeId(item.chapter_id)}`}
                            >
                              <button className="btn btn-sm ">
                                <i className="bi bi-pencil text-primary fw-bold h5"></i>
                              </button>
                            </Link>
                            <button
                              className="btn btn-sm"
                              onClick={() => handleDelete(item.chapter_id)}
                            >
                              <i className="bi bi-trash text-danger fw-bold h5"></i>{" "}
                            </button>
                            <button
                              className="btn btn-sm "
                              onClick={() => handleAddQuestion(item)}
                            >
                              <i class="bi bi-book text-secondary fw-bold h5"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {chapters.length === 0 && (
                    <p className="fw-bold">No chapters found.</p>
                  )}
                </div>
              </div>
              {/* Pagination */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between ">
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

export default Chapters;
