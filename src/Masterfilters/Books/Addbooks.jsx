import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';

const AddBook = () => {
  const [series, setSeries] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [bookName, setBookName] = useState('');
  const [bookCode, setBookCode] = useState('');
  const [activityFolderName, setActivityFolderName] = useState('');
  const [fileToAccess, setFileToAccess] = useState('');
  const [bookDownloadLink, setBookDownloadLink] = useState('');
  const [androidDownloadLink, setAndroidDownloadLink] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [bookCover, setBookCover] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchSeries(selectedClass, selectedSubject);
    }
  }, [selectedClass, selectedSubject]);

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

  const fetchSubjects = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/fetchsubjects.php`);
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

  const fetchSeries = async (classId, subjectId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchseriesforbooks.php?class_id=${classId}&subject_id=${subjectId}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('selectedSeries', selectedSeries);
    formData.append('selectedClass', selectedClass);
    formData.append('selectedSubject', selectedSubject);
    formData.append('bookName', bookName);
    formData.append('bookCode', bookCode);
    formData.append('activityFolderName', activityFolderName);
    formData.append('fileToAccess', fileToAccess);
    formData.append('bookDownloadLink', bookDownloadLink);
    formData.append('androidDownloadLink', androidDownloadLink);
    formData.append('bookDescription', bookDescription);
    if (bookCover) {
      formData.append('bookCover', bookCover);
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/addbooks.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Book added successfully');
        navigate("/books");
      } else {
        alert('Failed to add book');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding book');
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Topbar />
          <div className="col-md-12">
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-12 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                  <div className='text-grey h6 fw-bold'>Add Book</div>
                  <hr />
                  <form onSubmit={handleSubmit}>
                    <label className='fw-bold'>Class<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      value={selectedClass}
                      required
                      onChange={(e) => setSelectedClass(e.target.value)}
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
                      required
                      onChange={(e) => setSelectedSubject(e.target.value)}
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
                      required
                      onChange={(e) => setSelectedSeries(e.target.value)}
                    >
                      <option value="">--Select Series--</option>
                      {series.map((ser) => (
                        <option key={ser.series_id} value={ser.series_id}>{ser.series_name}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Book Name<span className= 'text-danger'>*</span></label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Book Name'
                      value={bookName}
                      required
                      onChange={(e) => setBookName(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Book Code<span className= 'text-danger'>*</span></label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Book Code'
                      value={bookCode}
                      required
                      onChange={(e) => setBookCode(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Book Download Link</label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Book Download Link'
                      value={bookDownloadLink}
                      onChange={(e) => setBookDownloadLink(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>TPG Download Link</label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter TPG Download Link'
                      value={androidDownloadLink}
                      onChange={(e) => setAndroidDownloadLink(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Book Description</label><br />
                    <textarea
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Book Description'
                      value={bookDescription}
                      onChange={(e) => setBookDescription(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Book Cover</label><br />
                    <input
                      type="file"
                      className='form-control mt-1 cursor'
                      onChange={(e) => setBookCover(e.target.files[0])}
                    /><br /><br />
                    <div className= 'd-flex justify-content-end'>
                    <button type="submit" className='btn btn-primary mt-3 mx-3 cursor'>Add Book</button>
                    <Link to = "/books"><button className="btn btn-danger mt-3">Cancel</button></Link>

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

export default AddBook;
