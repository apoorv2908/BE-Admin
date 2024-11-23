import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';
import { FaTimes } from 'react-icons/fa'; // Importing a cancel icon from react-icons
import { Link } from 'react-router-dom';
import { decodeId } from '../../Access/Encodedecode';


const Updatechapter = () => {
  const { chapter_id } = useParams();
  const decodedId = decodeId(chapter_id); // Decode the ID for internal us
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [books, setBooks] = useState([]);
  const [sections, setSections] = useState([]);
  const [units, setUnits] = useState([]);
  const [chapterName, setChapterName] = useState('');
  const [chapterDescription, setChapterDescription] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [chapterImage, setChapterImage] = useState(null); // New state for chapter image
  const [existingPic, setExistingPic] = useState('');

  useEffect(() => {
    fetchChapterDetails();
    fetchSeries();
    fetchClasses();
    fetchSubjects();
    fetchBooks();
    fetchSections();
    fetchUnits();
  }, []);

  const fetchChapterDetails = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Chapters/getchapter.php?chapter_id=${decodedId}`);
      const data = await response.json();
      if (data.success) {
        const chapter = data.chapter;
        setChapterName(chapter.chapter_title);
        setChapterDescription(chapter.chapter_description);
        setSelectedSeries(chapter.series_id);
        setSelectedClass(chapter.class_id);
        setSelectedSubject(chapter.subject_id);
        setSelectedBook(chapter.book_id);
        setSelectedSection(chapter.section_id);
        setSelectedUnit(chapter.unit_id);
        setExistingPic(chapter.chapter_image);
      } else {
        alert('Failed to fetch chapter details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching chapter details');
    }
  };

  const fetchSeries = async () => {
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

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Book/fetchbooks.php`);
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

  const fetchSections = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Sections/fetchsections.php`);
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

  const fetchUnits = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Units/fetchunits.php`);
      const data = await response.json();
      if (data.success) {
        setUnits(data.units);
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
    const formData = new FormData();
    formData.append('selectedSeries', selectedSeries);
    formData.append('selectedClass', selectedClass);
    formData.append('selectedSubject', selectedSubject);
    formData.append('selectedBook', selectedBook);
    formData.append('selectedSection', selectedSection);
    formData.append('selectedUnit', selectedUnit);
    formData.append('chapterName', chapterName);
    formData.append('chapterDescription', chapterDescription);
    if (chapterImage) {
      formData.append('chapterImage', chapterImage);
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Chapters/updatechapters.php?chapter_id=${decodedId}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Chapter updated successfully');
        navigate('/chapters');
      } else {
        alert('Failed to update chapter');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating chapter');
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
                <div className='text-grey h6 fw-bold'>Update Chapter</div>
                <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <label className= 'fw-bold'>Series</label><br />
                    <select
                      className='custom-input'
                      value={selectedSeries}
                      onChange={(e) => setSelectedSeries(e.target.value)}
                    >
                      <option value="">Select Series</option>
                      {series.map((ser) => (
                        <option key={ser.series_id} value={ser.series_id}>{ser.series_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Class</label><br />
                    <select
                      className='custom-input '
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls.class_id} value={cls.class_id}>{cls.class_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Subject</label><br />
                    <select
                      className='custom-input '
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>{sub.subject_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Book</label><br />
                    <select
                      className='custom-input '
                      value={selectedBook}
                      onChange={(e) => setSelectedBook(e.target.value)}
                    >
                      <option value="">Select Book</option>
                      {books.map((book) => (
                        <option key={book.book_id} value={book.book_id}>{book.book_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Section </label><br />
                    <select
                      className='custom-input '
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                    >
                      <option value="">Select Section </option>
                      {sections.map((section) => (
                        <option key={section.section_id} value={section.section_id}>{section.section_name}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Unit </label><br />
                    <select
                      className='custom-input '
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                    >
                      <option value="">Select Unit </option>
                      {units.map((unit) => (
                        <option key={unit.unit_id} value={unit.unit_id}>{unit.unit_title}</option>
                      ))}
                    </select><br /><br />

                    <label className= 'fw-bold'>Chapter Name</label><br />
                    <input
                      className='custom-input '
                      placeholder='Enter Chapter Name'
                      value={chapterName}
                      onChange={(e) => setChapterName(e.target.value)}
                    /><br /><br />

                    <label className= 'fw-bold'>Chapter Description</label><br />
                    <textarea
                      className='custom-input '
                      placeholder='Enter Chapter Description'
                      value={chapterDescription}
                      onChange={(e) => setChapterDescription(e.target.value)}
                    ></textarea><br /><br></br>

<label className='fw-bold'>Chapter Image <span className='comb text-danger'>(max size: 2 MB, jpg/jpeg/png/gif)</span></label><br /><br></br>
{existingPic && (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <embed src={`${config.apiBaseUrl}/fullmarks-server/uploads/chapter_content/${existingPic}`} alt="Page Image" style={{ width: '100px' }} />
    <FaTimes
      style={{
        position: 'absolute',
        top: '0',
        right: '0',
        cursor: 'pointer',
        color: 'red',
        backgroundColor: 'white',
        borderRadius: '50%'
      }}
      onClick={() => {
        setExistingPic(''); // Hide the image
        setChapterImage(null); // Reset the chapter image state
      }}
    />
  </div>
)}

{!existingPic && (
  <>
    <span className='text-grey h6'>Insert New Media? </span><br></br>
    <input
      className='cursor form-control'
      type='file'
      onChange={(e) => setChapterImage(e.target.files[0])}
    /><br /><br></br>
  </>
)}

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary mt-3 mx-3">Update Chapter</button>
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

export default Updatechapter;
