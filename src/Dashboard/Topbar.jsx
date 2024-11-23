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
    <Navbar expand="lg" className="text-dark px-2 bg-white">
      <Navbar.Brand>
        <img className="mno" src={logo} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="mx-5 fw-bold" as={Link} to="/homepage">
            DASHBOARD
          </Nav.Link>
          <NavDropdown
            title="MASTERFILTERS"
            className="mx-3 fw-bold"
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
            title="RESOURCES"
            className="mx-3 fw-bold"
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
            title="USERS"
            className="mx-3 fw-bold"
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
            title="CMS"
            className="mx-3 fw-bold"
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
        </Nav>
      </Navbar.Collapse>
      {isAuthenticated && (
        <Nav>
          <button
            className="btn btn-danger text-white"
            onClick={handleLogout}
            style={{ color: "black", textDecoration: "none" }}
          >
            Logout
          </button>
        </Nav>
      )}
    </Navbar>
  );
};

export default Topbar;
