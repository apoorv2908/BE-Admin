import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";

const Addunits = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [series, setSeries] = useState([]);
  const [books, setBooks] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [unitTitle, setUnitTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/fetchclasses.php`
      );
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        alert("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching classes");
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/fetchsubjects.php?class_id=${classId}`
      );
      const data = await response.json();
      if (data.success) {
        setSubjects(data.subjects);
      } else {
        alert("Failed to fetch subjects");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching subjects");
    }
  };

  const fetchSeries = async (classId, subjectId) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchseriesforbooks.php?class_id=${classId}&subject_id=${subjectId}`
      );
      const data = await response.json();
      if (data.success) {
        setSeries(data.series);
        // Reset books and selected values when series changes
        setBooks([]);
        setSelectedSeries("");
        setSelectedBook("");
      } else {
        alert("Failed to fetch series");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching series");
    }
  };

  const fetchBooks = async (classId, subjectId, seriesId) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchbookforsection.php?class_id=${classId}&subject_id=${subjectId}&series_id=${seriesId}`
      );
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
      } else {
        alert("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching books");
    }
  };

  const fetchSections = async (bookId) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/fetchsections.php?book_id=${bookId}`
      );
      const data = await response.json();
      if (data.success) {
        setSections(data.sections);
      } else {
        alert("Failed to fetch sections");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching sections");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Units/addunits.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedClass,
            selectedSubject,
            selectedSeries,
            selectedBook,
            selectedSection: selectedSection || "",
            unitTitle,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Unit added successfully");
        navigate("/units");
      } else {
        alert("Failed to add unit");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding unit");
    }
  };

  return (
    <div>
      <div>
        <Topbar />
        <div
          className="container bg-white mt-3 mb-3 p-3"
          style={{ boxShadow: "0px 0px 7px grey" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="text-grey fw-bold h4">Add Unit</div>
              <hr></hr>
              <form onSubmit={handleSubmit}>
                <label className="fw-bold">
                  Class<span className="text-danger">*</span>
                </label>
                <br />
                <select
                  className="custom-input  cursor"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    fetchSubjects(e.target.value);
                  }}
                >
                  <option value="">--Select Class--</option>
                  {classes.map((cls) => (
                    <option key={cls.class_id} value={cls.class_id}>
                      {cls.class_name}
                    </option>
                  ))}
                </select>
                <br />
                <br></br>
                <label className="fw-bold">
                  Subject<span className="text-danger">*</span>
                </label>
                <br />
                <select
                  className="custom-input  cursor"
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    fetchSeries(selectedClass, e.target.value);
                  }}
                >
                  <option value="">--Select Subject--</option>
                  {subjects.map((sub) => (
                    <option key={sub.subject_id} value={sub.subject_id}>
                      {sub.subject_name}
                    </option>
                  ))}
                </select>
                <br />
                <br></br>
                <label className="fw-bold">
                  Series<span className="text-danger">*</span>
                </label>
                <br />
                <select
                  className="custom-input  cursor"
                  value={selectedSeries}
                  onChange={(e) => {
                    setSelectedSeries(e.target.value);
                    fetchBooks(selectedClass, selectedSubject, e.target.value);
                  }}
                >
                  <option value="">--Select Series--</option>
                  {series.map((ser) => (
                    <option key={ser.series_id} value={ser.series_id}>
                      {ser.series_name}
                    </option>
                  ))}
                </select>
                <br />
                <br></br>
                <label className="fw-bold">
                  Book<span className="text-danger">*</span>
                </label>
                <br />
                <select
                  className="custom-input  cursor"
                  value={selectedBook}
                  onChange={(e) => {
                    setSelectedBook(e.target.value);
                    fetchSections(e.target.value);
                  }}
                >
                  <option value="">--Select Book--</option>
                  {books.map((book) => (
                    <option key={book.book_id} value={book.book_id}>
                      {book.book_name}
                    </option>
                  ))}
                </select>
                <br />
                <br></br>
                <label className="fw-bold">Section</label>
                <br />
                <select
                  className="custom-input  cursor"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">--Select Section--</option>
                  {sections.map((sec) => (
                    <option key={sec.section_id} value={sec.section_id}>
                      {sec.section_name}
                    </option>
                  ))}
                </select>
                <br />
                <br></br>
                <label className="fw-bold">
                  Unit Title<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  className="custom-input  cursor"
                  placeholder="Enter Unit Title"
                  value={unitTitle}
                  onChange={(e) => setUnitTitle(e.target.value)}
                />
                <br />
                <br></br>
                <div className="d-flex justify-content-end">
                  <button type="submit" className=" btn-custom ">
                    Add Unit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addunits;
