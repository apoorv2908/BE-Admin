import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';
import { decodeId } from '../../Access/Encodedecode';

const Updatesections = () => {
  const { section_id } = useParams();
  const decodedId = decodeId(section_id); // Decode the ID for internal use
  const [section, setSection] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [series, setSeries] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [sectionName, setSectionName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSection();
    fetchClasses();
  }, []);

  const fetchSection = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/getSection.php?section_id=${decodedId}`);
      const data = await response.json();
      if (data.success) {
        const sectionData = data.section;
        setSection(sectionData);
        setSelectedClass(sectionData.class_id);
        setSelectedSubject(sectionData.subject_id);
        setSelectedSeries(sectionData.series_id);
        setSelectedBook(sectionData.book_id);
        setSectionName(sectionData.section_name);
        fetchSubjects(sectionData.class_id);
        fetchSeries(sectionData.subject_id);
        fetchBooks(sectionData.series_id);
      } else {
        alert('Failed to fetch section');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching section');
    }
  };

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
      } else {
        alert('Failed to fetch subjects');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching subjects');
    }
  };

  const fetchSeries = async (subjectId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Series/fetchseries.php?subject_id=${subjectId}`);
      const data = await response.json();
      if (data.success) {
        setSeries(data.series);
      } else {
        alert('Failed to fetch series');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching series');
    }
  };

  const fetchBooks = async (seriesId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchbooks.php?series_id=${seriesId}`);
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
      } else {
        alert('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching books');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/updatesections.php?section_id=${decodedId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedClass, selectedSubject, selectedSeries, selectedBook, sectionName }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Section updated successfully');
        navigate('/sections');
      } else {
        alert('Failed to update section');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating section');
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
            <div className="container ">
              {/* Topbar */}
              <div className="row">
                <div className="col-md-12 mt-3 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                <div className='text-grey h6'>Update Section</div>
                <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <label className= 'fw-bold'>Class</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedClass}
                      required
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        fetchSubjects(e.target.value);
                      }}
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls.class_id} value={cls.class_id}>{cls.class_name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className= 'fw-bold'>Subject</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedSubject}
                      required
                      onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        fetchSeries(e.target.value);
                      }}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>{sub.subject_name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className= 'fw-bold'>Series</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedSeries}
                      required
                      onChange={(e) => {
                        setSelectedSeries(e.target.value);
                        fetchBooks(e.target.value);
                      }}
                    >
                      <option value="">Select Series</option>
                      {series.map((ser) => (
                        <option key={ser.series_id} value={ser.series_id}>{ser.series_name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className= 'fw-bold'>Book</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedBook}
                      required
                      onChange={(e) => setSelectedBook(e.target.value)}
                    >
                      <option value="">Select Book</option>
                      {books.map((book) => (
                        <option key={book.book_id} value={book.book_id}>{book.book_name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className= 'fw-bold'>Section Name</label><br />
                    <input
                      className='custom-input  cursor'
                      placeholder='Enter Section Name'
                      required
                      value={sectionName}
                      onChange={(e) => setSectionName(e.target.value)}
                    /><br /><br></br>
<div className= 'd-flex justify-content-end'>
                    <button type="submit" className="btn btn-primary mt-3 mx-3">Update Section</button>
                    <Link to = "/sections"><button className="btn btn-danger mt-3">Cancel</button></Link>
                    </div>                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatesections;
