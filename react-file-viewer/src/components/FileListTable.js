import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Component that renders a table of file names.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onRowClick - Callback function to handle row click events.
 * @returns {JSX.Element} The rendered component.
 */
function FileListTable({ onRowClick }) {
  const data = useSelector((state) => state.files.fileList);
  return (
    <div className="container">
      <h3>File List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Filename</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fileName, idx) => (
            <tr
              data-testid="data-row"
              key={idx}
              onClick={() => onRowClick(fileName)}
            >
              <td>{fileName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileListTable;
