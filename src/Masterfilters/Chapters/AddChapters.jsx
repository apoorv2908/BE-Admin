import React, { useState, useEffect } from 'react';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddChapters = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [series, setSeries] = useState([]);
  const [books, setBooks] = useState([]);
  const [sections, setSections] = useState([]);
  const [units, setUnits] = useState([]);
  const [chapterName, setChapterName] = useState('');
  const [chapterDescription, setChapterDescription] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [chapterImage, setChapterImage] = useState(null); // New state for chapter image
  const navigate = useNavigate();

  useEffect(() => { 
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/fetchclasses.php`);
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        alert('Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching classes');
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/fetchsubjects.php?class_id=${classId}`);
      const data = await response.json();
      if (data.success) {
        setSubjects(data.subjects);
        setSeries([]);
        setBooks([]);
        setSections([]);
        setUnits([]);
        setSelectedSubject('');
        setSelectedSeries('');
        setSelectedBook('');
        setSelectedSection('');
        setSelectedUnit('');
      } else {
        alert('Failed to fetch subjects');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching subjects');
    }
  };

  const fetchSeries = async (classId, subjectId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchseriesforbooks.php?class_id=${classId}&subject_id=${subjectId}`);
      const data = await response.json();
      if (data.success) {
        setSeries(data.series);
        setBooks([]);
        setSections([]);
        setUnits([]);
        setSelectedSeries('');
        setSelectedBook('');
        setSelectedSection('');
        setSelectedUnit('');
      } else {
        alert('Failed to fetch series');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching series');
    }
  };

  const fetchBooks = async (classId, subjectId, seriesId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchbookforsection.php?class_id=${classId}&subject_id=${subjectId}&series_id=${seriesId}`);
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
        setSections([]);
        setUnits([]);
        setSelectedBook('');
        setSelectedSection('');
        setSelectedUnit('');
      } else {
        alert('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching books');
    }
  };

  const fetchSections = async (classId, subjectId, seriesId, bookId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/fetchsectionforunit.php?class_id=${classId}&subject_id=${subjectId}&series_id=${seriesId}&book_id=${bookId}`);
      const data = await response.json();
      if (data.success) {
        setSections(data.sections);
        setUnits([]);
        setSelectedSection('');
        setSelectedUnit('');
      } else {
        alert('Failed to fetch sections');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching sections');
    }
  };

  const fetchUnits = async (classId, subjectId, seriesId, bookId, sectionId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchunitforchapter.php?class_id=${classId}&subject_id=${subjectId}&series_id=${seriesId}&book_id=${bookId}&section_id=${sectionId}`);
      const data = await response.json();
      if (data.success) {
        setUnits(data.units);
        setSelectedUnit('');
      } else {
        alert('Failed to fetch units');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching units');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!selectedClass || !selectedSubject || !selectedSeries || !selectedBook || !chapterName) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('selectedSeries', selectedSeries);
    formData.append('selectedClass', selectedClass);
    formData.append('selectedSubject', selectedSubject);
    formData.append('selectedBook', selectedBook);
    formData.append('selectedSection', selectedSection || ''); // Send empty string if not selected
    formData.append('selectedUnit', selectedUnit || ''); // Send empty string if not selected
    formData.append('chapterName', chapterName);
    formData.append('chapterDescription', chapterDescription);
    formData.append('chapterImage', chapterImage); // Append chapter image to FormData

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Chapters/addchapters.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Chapter added successfully');
        navigate("/chapters");
      } else {
        alert('Failed to add chapter');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding chapter');
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
                  <div className='text-grey h6 fw-bold'>Add Chapter</div>
                  <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <label className= 'fw-bold'>Class<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      required = "true"
                      value={selectedClass}
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        fetchSubjects(e.target.value);
                      }}
                    >
                      <option value="">--Select Class---</option>
                      {classes.map((cls) => (
                        <option key={cls.class_id} value={cls.class_id}>{cls.class_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Subject<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      value={selectedSubject}
                      required = "true"
                      onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        fetchSeries(selectedClass, e.target.value);
                      }}
                    >
                      <option value="">--Select Subject--</option>
                      {subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>{sub.subject_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Series<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      required = "true"
                      value={selectedSeries}
                      onChange={(e) => {
                        setSelectedSeries(e.target.value);
                        fetchBooks(selectedClass, selectedSubject, e.target.value);
                      }}
                    >
                      <option value="">--Select Series--</option>
                      {series.map((ser) => (
                        <option key={ser.series_id} value={ser.series_id}>{ser.series_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Book<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1'
                      value={selectedBook}
                      required = "true"
                      onChange={(e) => {
                        setSelectedBook(e.target.value);
                        fetchSections(selectedClass, selectedSubject, selectedSeries, e.target.value);
                      }}
                    >
                      <option value="">--Select Book--</option>
                      {books.map((book) => (
                        <option key={book.book_id} value={book.book_id}>{book.book_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Section </label><br />
                    <select
                      className='custom-input mt-1'
                      value={selectedSection}
                      onChange={(e) => {
                        setSelectedSection(e.target.value);
                        fetchUnits(selectedClass, selectedSubject, selectedSeries, selectedBook, e.target.value);
                      }}
                    >
                      <option value="">--Select Section--</option>
                      {sections.map((section) => (
                        <option key={section.section_id} value={section.section_id}>{section.section_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Unit</label><br />
                    <select
                      className='custom-input mt-1'
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                    >
                      <option value="">--Select Unit--</option>
                      {units.map((unit) => (
                        <option key={unit.unit_id} value={unit.unit_id}>{unit.unit_title}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Chapter Name<span className= 'text-danger'>*</span></label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Chapter Name'
                      value={chapterName}
                      onChange={(e) => setChapterName(e.target.value)}
                      required = "true"
                    /><br /><br />

  
              <label className='fw-bold'>Chapter Media<span className= 'text-success mx-2' style = {{fontSize: "13px"}}>[ jpg, jpeg, png, pdf (max size: 10MB) ] </span></label><br />
                    <input
                      className='form-control mt-1 cursor'
                      type='file'
                      accept='image/jpeg,image/png,image/gif,application/pdf' // Updated accept attribute to accept images and PDFs
                      onChange={(e) => setChapterImage(e.target.files[0])}
                    /><br></br>
                    <label className= 'fw-bold'>Chapter Description</label><br />
                    <textarea
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Chapter Description'
                      value={chapterDescription}
                      onChange={(e) => setChapterDescription(e.target.value)}
                    ></textarea><br /><br></br>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary mt-3 mx-3">Add Chapter</button>
                      <Link to = "/chapters"><button className="btn btn-danger mt-3">Cancel</button></Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChapters;
