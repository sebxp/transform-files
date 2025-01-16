import React from "react";
import { Link } from "react-router";

const NotFound = ({ message }) => {
  return (
    <div className="container text-center mt-5">
      <h1>404 - Not Found</h1>
      <p>{message || "The page you are looking for does not exist."}</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
