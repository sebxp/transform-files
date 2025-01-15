import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function FileDataTable({ data }) {
  return (
    <div className="container">
      <h3>File Data</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>File</th>
            <th>Lines</th>
          </tr>
        </thead>
        <tbody>
          {data.map((file, idx) => (
            <tr key={idx}>
              <td>{file.file}</td>
              <td>
                <ul>
                  {file.lines.map((line, index) => (
                    <li key={index}>
                      {line.text} | {line.number} | {line.hex}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileDataTable;
