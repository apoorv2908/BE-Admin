import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div>
      <Topbar />
      <div
        className="d-flex justify-content-center h1"
        style={{ marginTop: "200px" }}
      >
        Welcome to Dashboard
      </div>
    </div>
  );
};

export default Homepage;
