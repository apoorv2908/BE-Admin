import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Dashboard/Topbar";
import config from "../Access/config";
import "./Styles/Addlibrary.css";

const Addlibrary = () => {
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
  const [videoFile, setVideoFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [interactivitiesFile, setInteractivitesFile] = useState(null);
  const [interactivitiesLink, setInteractivitesLink] = useState(null);

  const [addnworksheetsFile, setAddnworksheetsFile] = useState(null);
  const [addnworksheetsLink, setAddnworksheetsLink] = useState(null);

  const [addnactivitiesFile, setAddnactivitiesFile] = useState(null);
  const [addnactivitiesLink, setAddnactivitiesLink] = useState(null);

  const [answerkeysFile, setAnswerkeysFile] = useState(null);
  const [answerkeysLink, setAnswerkeysLink] = useState(null);

  const [videoLink, setVideoLink] = useState("");
  const [documentLink, setDocumentLink] = useState("");
  const [lessonPlanLink, setLessonPlanLink] = useState("");
  const [audioLink, setAudioLink] = useState("");
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
        navigate("/library");
      } else {
        alert("Failed to add library resource");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding library resource");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <Topbar />
          {/* Main content */}
          <div className="col-md-12">
            <div className="container mt-3">
              {/* Topbar */}
              <div className="row">
                <div className="col-md-12 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="text-grey h6">Add Resource</div>
                  <hr></hr>
                  <form onSubmit={handleSubmit}>
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
                        fetchBooks(
                          selectedClass,
                          selectedSubject,
                          e.target.value
                        );
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
                      Resource Title<span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      className="custom-input"
                      type="text"
                      value={resourceTitle}
                      placeholder="Enter Resource Title"
                      required
                      onChange={(e) => setResourceTitle(e.target.value)}
                    />
                    <br />
                    <br></br>
                    <label className="fw-bold">
                      Resource Type<span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      className="custom-input cursor"
                      value={resourceType}
                      required
                      onChange={(e) => setResourceType(e.target.value)}
                    >
                      <option value="">--Select Resource Type--</option>
                      <option value="videos">Videos</option>
                      <option value="documents">Documents</option>
                      <option value="audio">Audio</option>
                      <option value="interactivities">Interactivities</option>
                      <option value="addnworksheets">
                        Additional Worksheets
                      </option>
                      <option value="addnactivities">
                        Additional Activities
                      </option>
                      <option value="answerkeys">Answer Keys</option>
                    </select>
                    <br />
                    <br></br>
                    <div class="bg-light">
                      {resourceType === "videos" && (
                        <>
                          <div className="mx-5">
                            <label className=" mt-2 fw-bold">Video File</label>
                            <br />
                            <input
                              className="  form-control"
                              type="file"
                              accept=".mp4"
                              onChange={(e) => setVideoFile(e.target.files[0])}
                            />
                            <br />
                            <br></br>
                            <div className="d-flex justify-content-center fw-bold">
                              OR
                            </div>
                            <label className="fw-bold">Enter Video Link</label>
                            <br />
                            <input
                              className="custom-input "
                              type="text"
                              value={videoLink}
                              onChange={(e) => setVideoLink(e.target.value)}
                              placeholder="Enter Video URL/Link "
                            />
                            <br />
                            <br></br>
                          </div>
                        </>
                      )}
                      {(resourceType === "documents" ||
                        resourceType === "lessonplans") && (
                        <>
                          <div className="mx-5">
                            <label className="fw-bold mt-2">
                              Document File
                            </label>
                            <br />
                            <input
                              className="form-control"
                              type="file"
                              onChange={(e) =>
                                setDocumentFile(e.target.files[0])
                              }
                            />
                            <br />
                            <br></br>
                            <div className="d-flex justify-content-center fw-bold">
                              OR
                            </div>

                            <label className="fw-bold">
                              Enter Document Link
                            </label>
                            <br />
                            <input
                              className="custom-input"
                              type="text"
                              value={documentLink}
                              placeholder="Enter Document URL/Link"
                              onChange={(e) => setDocumentLink(e.target.value)}
                            />
                            <br />
                            <br></br>
                          </div>
                        </>
                      )}

                      {resourceType === "audio" && (
                        <>
                          <div className="mx-5">
                            <label className=" mt-2 fw-bold">Audio File</label>
                            <br />
                            <input
                              className="  form-control"
                              type="file"
                              accept=".mp3"
                              onChange={(e) => setAudioFile(e.target.files[0])}
                            />
                            <br />
                            <br></br>
                            <div className="d-flex justify-content-center fw-bold">
                              OR
                            </div>
                            <label className="fw-bold">Enter Audio Link</label>
                            <br />
                            <input
                              className="custom-input "
                              type="text"
                              value={audioLink}
                              onChange={(e) => setAudioLink(e.target.value)}
                              placeholder="Enter Audio URL/Link "
                            />
                            <br />
                            <br></br>
                          </div>
                        </>
                      )}

                      {resourceType === "interactivities" && (
                        <>
                          <div className="mx-5">
                            <label className="fw-bold mt-2">
                              {" "}
                              Interactivities File
                            </label>
                            <br />
                            <input
                              className=" form-control"
                              type="file"
                              accept=".mp3"
                              onChange={(e) =>
                                setInteractivitesFile(e.target.files[0])
                              }
                            />

                            <br />
                            <br></br>
                            <div className="d-flex justify-content-center fw-bold">
                              OR
                            </div>

                            <label className="fw-bold">Enter URL</label>
                            <br />
                            <input
                              className="custom-input"
                              type="text"
                              placeholder="Enter Interactivites URL/Link "
                              value={interactivitiesLink}
                              onChange={(e) =>
                                setInteractivitesLink(e.target.value)
                              }
                            />
                            <br />
                            <br></br>
                          </div>
                        </>
                      )}

                      {resourceType === "addnworksheets" && (
                        <>
                          <div className="mx-5">
                            <label className=" mt-2 fw-bold">
                              Additional Worksheets File
                            </label>
                            <br />
                            <input
                              className="  form-control"
                              type="file"
                              onChange={(e) =>
                                setAddnworksheetsFile(e.target.files[0])
                              }
                            />
                            <br />
                            <br></br>
                            <div className="d-flex justify-content-center fw-bold">
                              OR
                            </div>
                            <label className="fw-bold">Add Link/URL</label>
                            <br />
                            <input
                              className="custom-input "
                              type="text"
                              value={addnworksheetsLink}
                              onChange={(e) =>
                                setAddnworksheetsLink(e.target.value)
                              }
                              placeholder="Enter Additional Worksheets  URL/Link "
                            />
                            <br />
                            <br></br>
                          </div>
                        </>
                      )}

                      {resourceType === "addnactivities" && (
                        <>
                          <div className="mx-5">
                            <label className=" mt-2 fw-bold">
                              Add Additional Activities
                            </label>
                            <br />
                            <input
                              className="  form-control"
                              type="file"
                              onChange={(e) =>
                                setAddnactivitiesFile(e.target.files[0])
                              }
                            />
                            <br />
                            <br></br>
                            <div className="d-flex justify-content-center fw-bold">
                              OR
                            </div>
                            <label className="fw-bold">Add Link/URL</label>
                            <br />
                            <input
                              className="custom-input "
                              type="text"
                              value={addnactivitiesLink}
                              onChange={(e) =>
                                setAddnactivitiesLink(e.target.value)
                              }
                              placeholder="Enter Video URL/Link "
                            />
                            <br />
                            <br></br>
                          </div>
                        </>
                      )}

                      {resourceType === "answerkeys" && (
                        <>
                          <div className="mx-5">
                            <label className=" mt-2 fw-bold">
                              Answer Keys File
                            </label>
                            <br />
                            <input
                              className="  form-control"
                              type="file"
                              onChange={(e) =>
                                setAnswerkeysFile(e.target.files[0])
                              }
                            />
                            <br />
                            <br></br>
                            <div className="d-flex justify-content-center fw-bold">
                              OR
                            </div>
                            <label className="fw-bold">Add Link/URL</label>
                            <br />
                            <input
                              className="custom-input "
                              type="text"
                              value={answerkeysLink}
                              onChange={(e) =>
                                setAnswerkeysLink(e.target.value)
                              }
                              placeholder="Enter Answer Keys URL/Link "
                            />
                            <br />
                            <br></br>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="d-flex justify-content-end mt-3 ">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* End of main content */}
        </div>
      </div>
    </div>
  );
};

export default Addlibrary;
