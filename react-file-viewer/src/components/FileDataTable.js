import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";

function FileDataTable() {
  const data = useSelector((state) => state.files.fileData);
  return (
    <div className="container">
      <h3>File Data</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>File name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {data.map((file) =>
            file.lines.map((line) => (
              <tr key={line.text}>
                <td>{file.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FileDataTable;
