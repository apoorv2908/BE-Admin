import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Dashboard/Topbar';
import config from '../Access/config';
import { decodeId } from '../Access/Encodedecode';

const Addbookpages = () => {
  const { book_id } = useParams();  // Get the book_id from the URL parameters
  const decodedId = decodeId(book_id); // Decode the ID for internal use

  const [pageTitle, setPageTitle] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [pageNumber, setPageNumber] = useState('');  // New state for page number
  const [image, setImage] = useState(null);
  const [bookName, setBookName] = useState('');
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookDetails(); 
    fetchChapters();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/fetchbookdetails.php?book_id=${decodedId}`);
      const data = await response.json();
      if (data.success) {
        setBookName(data.book.book_name);
      } else {
        alert('Failed to fetch book details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching book details');
    }
  };

  const fetchChapters = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/fetchchapters.php?book_id=${decodedId}`);
      const data = await response.json();
      if (data.success) {
        setChapters(data.chapters);
      } else {
        alert('Failed to fetch chapters');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching chapters');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pageTitle', pageTitle);
    formData.append('chapterName', chapterName);
    formData.append('pageNumber', pageNumber);  // Append page number to form data
    formData.append('book_id', decodedId);  // Include book_id in the form data
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/addbookpages.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Optionally, redirect to book pages list page or clear form
        navigate("/bookpages")
      } else {
        alert('Failed to add book page');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding book page');
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
            <Topbar/>
          <div className="col-md-12">
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-12 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                <div className='text-grey fw-bold h6'>Add Book Pages: {bookName}</div>
                <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <label className='fw-bold'>Page Title<span className= 'text-danger'>*</span></label><br />
                    <input
                      className='custom-input cursor'
                      placeholder='Enter Page Title'
                      value={pageTitle}
                      required
                      onChange={(e) => setPageTitle(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Chapter Name<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input cursor'
                      value={chapterName}
                      required
                      onChange={(e) => setChapterName(e.target.value)}
                    >
                      <option value="">Select Chapter</option>
                      {chapters.map((chapter) => (
                        <option key={chapter.chapter_id} value={chapter.chapter_id}>{chapter.chapter_title}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold'>Upload Page Image<span className= 'text-danger'>*</span></label><br />
                    <input
                      type="file"
                      className=' cursor form-control'
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => setImage(e.target.files[0])}
                    /><br /><br />

                    <div className='d-flex justify-content-end'>
                      <button type="submit" className="btn btn-primary mt-3">Add Page</button>
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

export default Addbookpages;
