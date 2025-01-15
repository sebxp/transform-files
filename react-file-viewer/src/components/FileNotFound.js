import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const message =
    location.state?.message || "The page you are looking for does not exist.";

  return (
    <div className="container text-center mt-5">
      <h1>404 - Not Found</h1>
      <p>{message}</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
