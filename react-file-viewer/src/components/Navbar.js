import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router";

/**
 * Navbar component that renders a navigation bar with links to view all files and view files list.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 */
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          View all files
        </Link>
        <div>
          <Link className="nav-link" to="/filenames">
            View files list
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
