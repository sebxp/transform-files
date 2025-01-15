import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setIsFileDetails } from "../redux/filesSlice";

function Navbar() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setIsFileDetails(false));
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={handleClick}>
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
