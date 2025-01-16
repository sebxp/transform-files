import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";

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
