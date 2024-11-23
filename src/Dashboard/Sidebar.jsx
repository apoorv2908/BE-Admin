import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Styles/Sidebar.css'; // Custom CSS for additional styling
import logo from "./Assets/logo-2.jpeg";


const Sidebar = () => {
  return (
    <div className="d-flex">
      <div className=" bg-white text-white p-3" >
        <Nav className="flex-column">
        <Navbar.Brand><img className='mno mx-5' src={logo} alt="Logo"  /></Navbar.Brand>
        <hr className= 'text-dark'></hr>

          <Nav.Link as={NavLink} to="/dashboard" className=" mt-3 fw-bold">Dashboard</Nav.Link>
          
          <NavDropdown title="Master Filters" className=" mt-3 fw-bold" id="masterfilters">
            <NavDropdown.Item as={NavLink} to="/classes" className="text-dark">Classes</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/subjects" className="text-dark">Subjects</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/series" className="text-dark">Series</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/books" className="text-dark">Books</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/units" className="text-dark">Units</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/sections" className="text-dark">Sections</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/chapters" className="text-dark">Chapters</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Resources" className="mt-3 fw-bold" id="resources">
            <NavDropdown.Item as={NavLink} to="/library" className="text-dark">Library</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/bookpages" className="text-dark">Book Pages</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Users" className="mt-3 fw-bold" id="users">
            <NavDropdown.Item as={NavLink} to="/schools" className="text-dark">Schools</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/students" className="text-dark">Students</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/teachers" className="text-dark">Teachers</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link as={NavLink} to="/updateaboutus" className="mt-3 text-white fw-bold">Content Management</Nav.Link>
        </Nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content p-4" style={{ flex: 1 }}>
        {/* Routes will render here */}
      </div>
    </div>
  );
};

export default Sidebar;
