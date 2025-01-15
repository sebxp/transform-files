import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function FileListTable({ data, onRowClick }) {
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
            <tr key={idx} onClick={() => onRowClick(fileName)}>
              <td>{fileName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileListTable;
