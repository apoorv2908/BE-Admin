import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import { useNavigate } from 'react-router-dom';
import config from '../../Access/config';
import { decodeId } from '../../Access/Encodedecode';

const Updatebooks = () => {
  const { id } = useParams();
  const decodedId = decodeId(id); // Decode the ID for internal use
  const [bookName, setBookName] = useState('');
  const [bookCode, setBookCode] = useState('');
  const [bookDownloadLink, setBookDownloadLink] = useState('');
  const [androidDownloadLink, setAndroidDownloadLink] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [series, setSeries] = useState([]);
  const [classes, setClasses] = useState([]);
  const [bookCover, setBookCover] = useState(null); // State to hold the file object
  const [existingBookCover, setExistingBookCover] = useState(''); // State to hold existing book cover filename
  const [subjects, setSubjects] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();

  // Function to fetch book details based on ID
  const fetchBook = useCallback(async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/getBook.php?book_id=${decodedId}`);
      const data = await response.json();
      if (data.success) {
        const { book_name, book_code, book_cover,  book_download_link, android_download_link, book_description, series_id, class_id, subject_id } = data.book;
        setBookName(book_name);
        setBookCode(book_code);
        setBookDownloadLink(book_download_link);
        setAndroidDownloadLink(android_download_link);
        setBookDescription(book_description);
        setSelectedSeries(series_id);
        setSelectedClass(class_id);
        setSelectedSubject(subject_id);
        setExistingBookCover(book_cover); // Set existing book cover filename
      } else {
        alert('Failed to fetch book data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching book data');
    }
  }, [id]);

  // Function to fetch series data
  const fetchSeries = useCallback(async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Series/fetchseries.php`);
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
  }, []);

  // Function to fetch classes data
  const fetchClasses = useCallback(async () => {
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
  }, []);

  // Function to fetch subjects data
  const fetchSubjects = useCallback(async () => {
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
  }, []);

  // Fetch initial data on component mount
  useEffect(() => {
    fetchBook();
    fetchSeries();
    fetchClasses();
    fetchSubjects();
  }, [fetchBook, fetchSeries, fetchClasses, fetchSubjects]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Create FormData object
      formData.append('book_id', decodedId);
      formData.append('bookName', bookName);
      formData.append('bookCode', bookCode);
      formData.append('bookDownloadLink', bookDownloadLink);
      formData.append('androidDownloadLink', androidDownloadLink);
      formData.append('bookDescription', bookDescription);
      formData.append('selectedSeries', selectedSeries);
      formData.append('selectedClass', selectedClass);
      formData.append('selectedSubject', selectedSubject);
      if (bookCover) {
        formData.append('bookCover', bookCover); // Append book cover file to FormData if it exists
      }

      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/updatebooks.php`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('Book updated successfully');
        navigate('/books');
      } else {
        alert('Failed to update book');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating book');
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
                  <div className='text-grey fw-bold'>Update Book</div>
                  <hr />
                  <form onSubmit={handleSubmit}>
                    <label className='fw-bold'>Series</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedSeries}
                      onChange={(e) => setSelectedSeries(e.target.value)}
                    >
                      <option value=''>Select Series</option>
                      {series.map((ser) => (
                        <option key={ser.series_id} value={ser.series_id}>{ser.series_name}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Class</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                    >
                      <option value=''>Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls.class_id} value={cls.class_id}>{cls.class_name}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Subject</label><br />
                    <select
                      className='custom-input  cursor'
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value=''>Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>{sub.subject_name}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Book Name</label><br />
                    <input
                      className='custom-input  cursor'
                      placeholder='Enter Book Name'
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Book Code</label><br />
                    <input
                      className='custom-input  cursor'
                      placeholder='Enter Book Code'
                      value={bookCode}
                      onChange={(e) => setBookCode(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Book Download Link</label><br />
                    <input
                      className='custom-input  cursor'
                      placeholder='Enter Book Download Link'
                      value={bookDownloadLink}
                      onChange={(e) => setBookDownloadLink(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>TPG Download Link</label><br />
                    <input
                      className='custom-input  cursor'
                      placeholder='Enter TPG Download Link'
                      value={androidDownloadLink}
                      onChange={(e) => setAndroidDownloadLink(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Book Description</label><br />
                    <textarea
                      className='custom-input  cursor'
                      placeholder='Enter Book Description'
                      value={bookDescription}
                      onChange={(e) => setBookDescription(e.target.value)}
                    ></textarea><br /><br />
                    <label className='fw-bold'>Book Cover <span className='comb text-danger'>(max size: 2 MB, jpg/jpeg/png/gif)</span></label><br /><br></br>
                    {existingBookCover && (
                      <div>
                        <img src={`${config.apiBaseUrl}/fullmarks-server/uploads/book_cover/${existingBookCover}`} alt="Page Image" style={{ width: '50px' }} />
                      </div>
                    )}
                    <span className= 'text-grey h6'>Add New Book Cover? </span>
                    <input
                      className=' cursor form-control'
                      type='file'
                      onChange={(e) => setBookCover(e.target.files[0])}
                    /><br /><br></br>
                    <div className= 'd-flex justify-content-end'>
                    <button type="submit" className="btn btn-primary mt-3 mx-3">Update Book</button>
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

export default Updatebooks;
