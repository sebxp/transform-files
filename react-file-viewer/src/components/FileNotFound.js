import React from "react";
import { Link } from "react-router";

/**
 * NotFound component displays a 404 error message.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.message] - Optional custom message to display.
 * @returns {JSX.Element} The rendered component.
 */
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
