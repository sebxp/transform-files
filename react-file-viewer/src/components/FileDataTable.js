import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";

/**
 * FileDataTable component renders a table displaying file data.
 * It retrieves the file data from the Redux store using the useSelector hook.
 *
 * The table contains the following columns:
 * - File name
 * - Text
 * - Number
 * - Hex
 *
 * Each row in the table represents a line of data from a file.
 *
 * @component
 * @example
 * return (
 *   <FileDataTable />
 * )
 */
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
              <tr data-testid="data-row" key={line.text}>
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
