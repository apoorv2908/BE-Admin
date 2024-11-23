import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../Access/config';
import Topbar from '../../Dashboard/Topbar';
import { decodeId } from '../../Access/Encodedecode';

const Assignbookteachers = () => {
  const [books, setBooks] = useState([]);
  const [assignedBooks, setAssignedBooks] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const { teacher_id } = useParams();
  const decodedId = decodeId(teacher_id); // Decode the ID for internal use

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchAssignedBooks();
    fetchTeacherName();
  }, []);

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

  const fetchAssignedBooks = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/fetchassigned.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher_id: decodedId }),
      });
      const data = await response.json();
      if (data.success) {
        setAssignedBooks(data.assignedBooks);
      } else {
        alert('Failed to fetch assigned books');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching assigned books');
    }
  };

  const fetchTeacherName = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/fetchteachername.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher_id: decodedId }),
      });
      const data = await response.json();
      if (data.success) {
        setTeacherName(data.teacher_name);
      } else {
        alert('Failed to fetch teacher name');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching teacher name');
    }
  };

  const handleCheckboxChange = (bookId) => {
    setAssignedBooks((prevAssignedBooks) =>
      prevAssignedBooks.includes(bookId)
        ? prevAssignedBooks.filter((id) => id !== bookId)
        : [...prevAssignedBooks, bookId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const booksToAssign = assignedBooks.map(bookId => ({ book_id: bookId }));

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/assignbooks.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher_id: decodedId, books: booksToAssign }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Books assigned successfully');
        navigate("/teachers");
      } else {
        alert('Failed to assign books');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error assigning books');
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
                  <div className='text-grey h6'>Assign Books to <b>{teacherName}</b></div>
                  <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope='col'>S.no</th>
                          <th scope="col">Book Name</th>
                          <th scope="col">Assign</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book, index) => (
                          <tr key={book.book_id}>
                            <td>{index + 1}</td>
                            <td>{book.book_name}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={assignedBooks.includes(book.book_id)}
                                onChange={() => handleCheckboxChange(book.book_id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='d-flex justify-content-end'>
                      <button type="submit" className="btn btn-primary mt-3">Assign Books</button>
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

export default Assignbookteachers;
