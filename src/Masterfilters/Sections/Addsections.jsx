import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';

const Addsections = () => {
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
        // Reset series and books when class changes
        setSeries([]);
        setBooks([]);
        setSelectedSubject('');
        setSelectedSeries('');
        setSelectedBook('');
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
        // Reset books when series changes
        setBooks([]);
        setSelectedSeries('');
        setSelectedBook('');
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
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/addsections.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedClass, selectedSubject, selectedSeries, selectedBook, sectionName }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Section added successfully');
        navigate('/sections');
      } else {
        alert('Failed to add section');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding section');
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
                  <div className='text-grey h6 fw-bold'>Add Section</div>
                  <hr />
                  <form onSubmit={handleSubmit}>
                    <label className='fw-bold'>Class<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      value={selectedClass}
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        fetchSubjects(e.target.value);
                      }}
                      required
                    >
                      <option value="">--Select Class--</option>
                      {classes.map((cls) => (
                        <option key={cls.class_id} value={cls.class_id}>{cls.class_name}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Subject<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      value={selectedSubject}
                      onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        fetchSeries(selectedClass, e.target.value);
                      }}
                      required
                    >
                      <option value="">--Select Subject--</option>
                      {subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>{sub.subject_name}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Series<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      value={selectedSeries}
                      onChange={(e) => {
                        setSelectedSeries(e.target.value);
                        fetchBooks(selectedClass, selectedSubject, e.target.value);
                      }}
                      required
                    >
                      <option value="">--Select Series--</option>
                      {series.map((ser) => (
                        <option key={ser.series_id} value={ser.series_id}>{ser.series_name}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Book<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      value={selectedBook}
                      onChange={(e) => setSelectedBook(e.target.value)}
                      required
                    >
                      <option value="">--Select Book--</option>
                      {books.map((book) => (
                        <option key={book.book_id} value={book.book_id}>{book.book_name}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Section Name<span className= 'text-danger'>*</span></label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Section Name'
                      value={sectionName}
                      onChange={(e) => setSectionName(e.target.value)}
                      required
                    /><br /><br />
                    <div className= 'd-flex justify-content-end'>
                    <button type="submit" className="btn btn-primary mt-3 mx-3">Add Section</button>
                    <Link to = "/sections"><button className="btn btn-danger mt-3">Cancel</button></Link>
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

export default Addsections;
