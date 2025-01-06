import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Dashboard/Topbar";
import config from "../Access/config";
import "./Styles/Addlibrary.css";

const Addquestion = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [series, setSeries] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const navigate = useNavigate();

  const [mcqOptions, setMcqOptions] = useState(["", "", "", ""]);
  // Match the Columns

  const [matchPair, setMatchPair] = useState({ left: "", right: "" });

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
        setSeries([]);
        setBooks([]);
        setChapters([]);
        setSelectedSubject("");
        setSelectedSeries("");
        setSelectedBook("");
        setSelectedChapter("");
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
        setBooks([]);
        setChapters([]);
        setSelectedSeries("");
        setSelectedBook("");
        setSelectedChapter("");
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
        setChapters([]);
        setSelectedBook("");
        setSelectedChapter("");
      } else {
        alert("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching books");
    }
  };

  const fetchChapters = async (classId, subjectId, seriesId, bookId) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchchapterforbook.php?class_id=${classId}&subject_id=${subjectId}&series_id=${seriesId}&book_id=${bookId}`
      );
      const data = await response.json();
      if (data.success) {
        setChapters(data.chapters);
        setSelectedChapter("");
      } else {
        alert("Failed to fetch chapters");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching chapters");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("selectedClass", selectedClass);
    formData.append("selectedSubject", selectedSubject);
    formData.append("selectedSeries", selectedSeries);
    formData.append("selectedBook", selectedBook);
    formData.append("resourceTitle", resourceTitle);
    formData.append("selectedChapter", selectedChapter); // Include the selected chapter
    formData.append("resourceType", resourceType);
    if (totalMarks) formData.append("totalMarks", totalMarks);
    if (questionImage) formData.append("questionImage", questionImage);
    if (questionAnswer) formData.append("questionAnswer", questionAnswer);

    if (resourceType === "mcq") {
      mcqOptions.forEach((option, index) =>
        formData.append(`mcqOption${index + 1}`, option)
      );
    }

    if (resourceType === "match") {
      formData.append("leftMatch", matchPair.left);
      formData.append("rightMatch", matchPair.right);
    }
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Resources/Library/addquestion.php`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Question added successfully");
        navigate("/question-bank");
      } else {
        alert("Failed to add question");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding question");
    }
  };

  return (
    <div>
      <Topbar />
      <div
        className="container bg-white mt-3 mb-3 p-3"
        style={{ boxShadow: "0px 0px 5px lightgrey" }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="text-grey fw-bold h4">Add Question</div>
            <hr />
            <form onSubmit={handleSubmit}>
              {/* Existing fields */}
              <label className="fw-bold">
                Class<span className="text-danger">*</span>
              </label>
              <br />
              <select
                className="custom-input cursor"
                value={selectedClass}
                required
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  fetchSubjects(e.target.value);
                }}
              >
                <option value="">Select Class</option>
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
                className="custom-input cursor"
                value={selectedSubject}
                required
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  fetchSeries(selectedClass, e.target.value);
                }}
              >
                <option value="">Select Subject</option>
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
                required
                onChange={(e) => {
                  setSelectedSeries(e.target.value);
                  fetchBooks(selectedClass, selectedSubject, e.target.value);
                }}
              >
                <option value="">Select Series</option>
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
                className="custom-input cursor"
                value={selectedBook}
                required
                onChange={(e) => {
                  setSelectedBook(e.target.value);
                  fetchChapters(
                    selectedClass,
                    selectedSubject,
                    selectedSeries,
                    e.target.value
                  );
                }}
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book.book_id} value={book.book_id}>
                    {book.book_name}
                  </option>
                ))}
              </select>
              <br />
              <br></br>
              <label className="fw-bold">
                Chapter<span className="text-danger">*</span>
              </label>
              <br />
              <select
                className="custom-input cursor"
                value={selectedChapter}
                required
                onChange={(e) => setSelectedChapter(e.target.value)}
              >
                <option value="">Select Chapter</option>
                {chapters.map((chap) => (
                  <option key={chap.chapter_id} value={chap.chapter_id}>
                    {chap.chapter_title}
                  </option>
                ))}
              </select>
              <br />
              <br></br>
              <label className="fw-bold">
                Question Type<span className="text-danger">*</span>
              </label>
              <br />
              <select
                className="custom-input cursor"
                value={resourceType}
                required
                onChange={(e) => setResourceType(e.target.value)}
              >
                <option value="">-- Select Question Type --</option>
                <option value="mcq">MCQ</option>
                <option value="trueFalse">True/False</option>
                <option value="short">Short Answer</option>
                <option value="long">Long Answer</option>
                <option value="match">Match the Columns</option>
              </select>
              <br></br>
              <br></br>
              <label className="fw-bold">
                Enter Question <span className="text-danger">*</span>
              </label>
              <br />
              <textarea
                className="custom-input"
                value={resourceTitle}
                placeholder="Enter Question"
                required
                rows={5} // Number of visible rows
                cols={50} // Number of character columns
                onChange={(e) => setResourceTitle(e.target.value)}
              />
              <br />
              {/* Dynamic MCQ Inputs */}
              {resourceType === "mcq" &&
                mcqOptions.map((option, index) => (
                  <div key={index} className="mx-5 mt-3 ">
                    <label className="fw-bold">Option {index + 1}</label>
                    <input
                      type="text"
                      className="custom-input mt-1"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...mcqOptions];
                        newOptions[index] = e.target.value;
                        setMcqOptions(newOptions);
                      }}
                    />
                    <br />
                  </div>
                ))}
              {resourceType === "match" && (
                <div className="d-flex justify-content-between mx-5 mt-4">
                  <div>
                    <label className="fw-bold">Left Side Match</label>

                    <textarea
                      type="text"
                      className="custom-input mt-1"
                      value={matchPair.left}
                      onChange={(e) =>
                        setMatchPair({
                          ...matchPair,
                          left: e.target.value,
                        })
                      }
                    />
                    <br />
                  </div>

                  <div className=" mt-3">
                    <i class="bi bi-arrows"></i>
                  </div>

                  <div>
                    <label className="fw-bold ">Right Side Match</label>
                    <textarea
                      type="text"
                      className="custom-input mt-1"
                      value={matchPair.right}
                      onChange={(e) =>
                        setMatchPair({
                          ...matchPair,
                          right: e.target.value,
                        })
                      }
                    />
                    <br />
                  </div>
                </div>
              )}
              <br></br>
              <label className="fw-bold">
                Question Weightage{" "}
                <span style={{ fontSize: "12px" }}>(Total Marks)</span>
              </label>
              <br />
              <input
                type="number"
                className="custom-input"
                value={totalMarks}
                placeholder="Enter Total Marks"
                onChange={(e) => setTotalMarks(e.target.value)}
              />
              <br />
              <br></br>
              <label className="fw-bold">Add Image for Question:{""} </label>
              <input
                type="file"
                className="mx-1"
                accept="image/*"
                onChange={(e) => setQuestionImage(e.target.files[0])}
              />
              <br />
              <br></br>
              <label className="fw-bold">Answer of the Question</label>
              <br />

              <textarea
                className="custom-input"
                value={questionAnswer}
                placeholder="Enter Answer"
                onChange={(e) => setQuestionAnswer(e.target.value)}
              />
              <br />
              <br></br>
              <div className="d-flex justify-content-end">
                <button className="btn-custom" type="submit">
                  Submit Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addquestion;
