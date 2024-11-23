import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';
import { decodeId } from '../../Access/Encodedecode';

const Updateunits = () => {
  const { unit_id } = useParams();
  const decodedId = decodeId(unit_id); // Decode the ID for internal use
  const [unit, setUnit] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [series, setSeries] = useState([]);
  const [books, setBooks] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [unitTitle, setUnitTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnit();
    fetchClasses();
  }, []);

  const fetchUnit = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Units/getUnit.php?unit_id=${decodedId}`);
      const data = await response.json();
      if (data.success) {
        const unitData = data.unit;
        setUnit(unitData);
        setSelectedClass(unitData.class_id);
        setSelectedSubject(unitData.subject_id);
        setSelectedSeries(unitData.series_id);
        setSelectedBook(unitData.book_id);
        setSelectedSection(unitData.section_id);
        setUnitTitle(unitData.unit_title);
        fetchSubjects(unitData.class_id);
        fetchSeries(unitData.subject_id);
        fetchBooks(unitData.series_id);
        fetchSections(unitData.book_id);
      } else {
        alert('Failed to fetch unit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching unit');
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

  const fetchSections = async (bookId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/fetchsections.php?book_id=${bookId}`);
      const data = await response.json();
      if (data.success) {
        setSections(data.sections);
      } else {
        alert('Failed to fetch sections');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching sections');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Units/updateunit.php?unit_id=${decodedId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedClass, selectedSubject, selectedSeries, selectedBook, selectedSection, unitTitle }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Unit updated successfully');
        navigate('/units');
      } else {
        alert('Failed to update unit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating unit');
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
                <div className='text-grey h6'>Update Unit</div>
                <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <label className= 'fw-bold'>Class</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedClass}
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
                      onChange={(e) => {
                        setSelectedBook(e.target.value);
                        fetchSections(e.target.value);
                      }}
                    >
                      <option value="">Select Book</option>
                      {books.map((book) => (
                        <option key={book.book_id} value={book.book_id}>{book.book_name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className= 'fw-bold'>Section</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                    >
                      <option value="">Select Section</option>
                      {sections.map((sec) => (
                        <option key={sec.section_id} value={sec.section_id}>{sec.section_name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className= 'fw-bold'>Unit Title</label><br />
                    <input
                      className='custom-input  cursor'
                      placeholder='Enter Unit Title'
                      value={unitTitle}
                      onChange={(e) => setUnitTitle(e.target.value)}
                    /><br /><br></br>
                     <div className= 'd-flex justify-content-end'>
                    <button type="submit" className="btn btn-primary mt-3 mx-3">Update Unit</button>
                    <Link to = "/units"><button className="btn btn-danger mt-3">Cancel</button></Link>
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

export default Updateunits;
