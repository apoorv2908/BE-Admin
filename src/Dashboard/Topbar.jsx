// src/NavbarComponent.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "./Assets/logo-2.jpeg";
import "./Styles/Topbar.css";
import { AuthContext } from "../Access/AuthContext";
import Logout from "../Access/Logout";

const Topbar = () => {
  const { isAuthenticated, username, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" className="text-dark px-2 bg-white border">
      <Navbar.Brand>
        <img className="mno" src={logo} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-center">
          <Nav.Link className=" fw-bold shift  mx-3 " as={Link} to="/homepage">
            Dashboard
          </Nav.Link>
          <NavDropdown
            title="Masterfilters"
            className=" fw-bold  shift mx-3 "
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to="/classes"
              style={{ color: "black", textDecoration: "none" }}
            >
              Classes
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/subjects"
              style={{ color: "black", textDecoration: "none" }}
            >
              Subjects
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/series"
              style={{ color: "black", textDecoration: "none" }}
            >
              Series
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/books"
              style={{ color: "black", textDecoration: "none" }}
            >
              Books
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/sections"
              style={{ color: "black", textDecoration: "none" }}
            >
              Section
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/units"
              style={{ color: "black", textDecoration: "none" }}
            >
              Units
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/chapters"
              style={{ color: "black", textDecoration: "none" }}
            >
              Chapters
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Resource"
            className="fw-bold  shift mx-3"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to="/library"
              style={{ color: "black", textDecoration: "none" }}
            >
              Library
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/bookpages"
              style={{ color: "black", textDecoration: "none" }}
            >
              Book Pages
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/question-bank"
              style={{ color: "black", textDecoration: "none" }}
            >
              Question Bank
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Users"
            className="fw-bold  shift mx-3"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to="/schools"
              style={{ color: "black", textDecoration: "none" }}
            >
              School
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/students"
              style={{ color: "black", textDecoration: "none" }}
            >
              Student
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/teachers"
              style={{ color: "black", textDecoration: "none" }}
            >
              Teachers
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Content"
            className="fw-bold  shift mx-3"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to="/updateaboutus"
              style={{ color: "black", textDecoration: "none" }}
            >
              About us
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Queries"
            className="fw-bold  shift mx-3"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to="/contacts"
              style={{ color: "black", textDecoration: "none" }}
            >
              Contacts
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/subscribers"
              style={{ color: "black", textDecoration: "none" }}
            >
              Subscribers
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      {isAuthenticated && (
        <Nav>
          <button className="btn " onClick={handleLogout}>
            <i class="bi bi-box-arrow-right h4 text-danger"></i>{" "}
          </button>
        </Nav>
      )}
    </Navbar>
  );
};

export default Topbar;
