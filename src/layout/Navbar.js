import React from "react";
import { Link } from "react-router-dom";
// function component -rfc
export default function Navbar() {

  

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Riders Log
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
            
          <Link className="btn btn-outline-primary " to="/addrider">
          Add Rider
        </Link>
        </div>
      </nav>
    </div>
  );
}
