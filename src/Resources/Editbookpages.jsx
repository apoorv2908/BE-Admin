import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Dashboard/Topbar';
import config from '../Access/config';

const EditBookpages = () => {
  const { page_id } = useParams();  // Get the page_id from the URL parameters
  const [pageTitle, setPageTitle] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [pageNumber, setPageNumber] = useState('');  // New state for page number
  const [image, setImage] = useState(null);
  const [bookName, setBookName] = useState('');
  const [bookId, setBookId] = useState('');  // Store book_id fetched from fetchPageDetails

  const [chapters, setChapters] = useState([]);
  const [existingImagePath, setExistingImagePath] = useState('');  // Existing image path
  const navigate = useNavigate();

  // UseEffect to fetch page details and chapters
  useEffect(() => {
    fetchPageDetails(); // Fetch details to populate fields
  }, []);

  // Fetch the page details
  const fetchPageDetails = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/getpagedetails.php?page_id=${page_id}`);
      const data = await response.json();
      if (data.success) {
        setPageTitle(data.page.page_title);
        setChapterName(data.page.chapter_id);
        setBookId(data.page.book_id); // Set bookId from page details
        setPageNumber(data.page.page_number);
        setBookName(data.page.book_name);
        setExistingImagePath(data.page.image_path);

        // Now that we have the book_id, fetch chapters
        fetchChapters(data.page.book_id);  // Pass book_id to fetchChapters
      } else {
        alert('Failed to fetch page details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching page details');
    }
  };

  // Fetch chapters based on book_id
  const fetchChapters = async (bookId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Chapters/fetchchapters.php?book_id=${bookId}`);
      const data = await response.json();
      if (data.success) {
        setChapters(data.chapters);  // Set the chapters based on the fetched data
      } else {
        alert('Failed to fetch chapters');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching chapters');
    }
  };

  // Handle the update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pageTitle', pageTitle);
    formData.append('chapterName', chapterName);
    formData.append('pageNumber', pageNumber);  
    formData.append('page_id', page_id);  
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Resources/updatebookpage.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        navigate("/bookpages");
      } else {
        alert('Failed to update book page');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating book page');
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
                  <div className='text-grey h6'>Update Book Page - {bookName}</div>
                  <hr></hr>
                  <form onSubmit={handleUpdate}>
                    <label className='fw-bold'>Page Title</label><br />
                    <input
                      className='custom-input  cursor'
                      placeholder='Enter Page Title'
                      value={pageTitle}
                      required
                      onChange={(e) => setPageTitle(e.target.value)}
                    /><br /><br />

                    <label className='fw-bold'>Chapter Name</label><br />
                    <select
                      className='custom-input  cursor'
                      value={chapterName}
                      required
                      onChange={(e) => setChapterName(e.target.value)}
                    >
                      <option value="">Select Chapter</option>
                      {chapters.map((chapter) => (
                        <option key={chapter.chapter_id} value={chapter.chapter_id}>{chapter.chapter_title}</option>
                      ))}
                    </select><br /><br />

                    <label className='fw-bold mb-2'>Upload Image</label><br />
                    {existingImagePath && (
                      <div>
                        <img src={`${config.apiBaseUrl}/fullmarks-server/uploads/book_pages/${existingImagePath}`} alt="Existing" width="100" />
                      </div>
                    )}
                    <p className= 'mt-2'>Choose New File? </p>
                    <input
                      type="file"
                      className='  cursor form-control mt-3'
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => setImage(e.target.files[0])}
                    /><br /><br />

                    <div className='d-flex justify-content-end'>
                      <button type="submit" className="btn btn-primary mt-3">Update Page</button>
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

export default EditBookpages;
