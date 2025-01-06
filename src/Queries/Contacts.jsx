import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Topbar from "../Dashboard/Topbar";
import config from "../Access/config";
import Sidebar from "../Dashboard/Sidebar";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchContacts();
  }, [searchQuery, page, limit, sortOption]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Queries/contacts.php?search=${searchQuery}&page=${page}&limit=${limit}&sortOption=${sortOption}`
      );

      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
        setTotal(data.total);
      } else {
        alert("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching contacts");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setPage(1);
  };

  const getSNo = (index) => {
    return (page - 1) * limit + index + 1;
  };

  const firstEntry = (page - 1) * limit + 1;
  const lastEntry = Math.min(page * limit, total);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Topbar />
          <div className="col-md-12">
            <div
              className="container mt-3 mb-3 p-3 bg-white"
              style={{ boxShadow: "0px 0px 7px grey" }}
            >
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <div className="fw-bold h4">Contacts</div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      className="cursor custom-input"
                      placeholder="Search Contacts..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              <hr />

              <div className="row mt-3">
                <div className="col-md-12 table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead className="table-secondary">
                      <tr className="text-center" style={{ fontSize: "15px" }}>
                        <th scope="col">S.no.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email - Phone</th>
                        <th scope="col">Message</th>
                        <th scope="col">Submitted On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact, index) => (
                        <tr key={contact.id} className="text-center">
                          <td>{getSNo(index)}</td>
                          <td>
                            {contact.first_name} {contact.last_name}
                          </td>
                          <td>
                            {contact.email} - {contact.phone}
                          </td>
                          <td>{contact.message}</td>
                          <td>{contact.submitted_on}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {contacts.length === 0 && (
                    <p className="fw-bold">No contacts found.</p>
                  )}
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">
                      Showing <b>{firstEntry}</b> to <b>{lastEntry}</b> of{" "}
                      <b>{total}</b> total entries
                    </div>
                    <div>
                      <nav>
                        <ul className="pagination">
                          <li
                            className={`page-item ${
                              page === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page - 1)}
                            >
                              Previous
                            </button>
                          </li>
                          {Array.from(
                            { length: Math.ceil(total / limit) },
                            (_, index) => (
                              <li
                                key={index + 1}
                                className={`page-item ${
                                  page === index + 1 ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(index + 1)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            )
                          )}
                          <li
                            className={`page-item ${
                              page === Math.ceil(total / limit)
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page + 1)}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pagination */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
