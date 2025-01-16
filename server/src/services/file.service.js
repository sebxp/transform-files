import axios from "axios";
import csvParser from "csv-parser";

const API_URL = "https://echo-serv.tbxnet.com/v1/secret/";
const API_TOKEN = "aSuperSecretKey";

/**
 * Fetches data from the API.
 *
 * @async
 * @function fetchData
 * @returns {Promise<Array>} A promise that resolves to an array of files.
 * @throws {Error} Throws an error if the data fetching fails.
 */
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}files`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data.files;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

/**
 * Fetches file data from the server.
 *
 * @param {string} filename - The name of the file to fetch.
 * @returns {Promise<Stream|boolean>} - A promise that resolves to the file data stream if successful, or false if an error occurs.
 */
const getFileData = async (filename) => {
  try {
    const response = await axios.get(`${API_URL}file/${filename}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      responseType: "stream",
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

/**
 * Parses CSV data and extracts valid rows based on specific criteria.
 *
 * @param {ReadableStream} data - The CSV data stream to be parsed.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of parsed lines.
 * Each parsed line is an object containing `text`, `number`, and `hex` properties.
 *
 * The function validates each row to ensure:
 * - It contains exactly 4 keys: 'file', 'text', 'number', and 'hex'.
 * - None of the values for 'file', 'text', 'number', and 'hex' are empty strings.
 * - The 'hex' value is exactly 32 characters long.
 * - The 'number' value is a valid integer.
 */
const parseData = async (data) => {
  const parsedLines = [];
  return new Promise((resolve, reject) => {
    data
      .pipe(csvParser())
      .on("data", (row) => {
        if (
          Object.keys(row).length === 4 &&
          "file" in row &&
          "text" in row &&
          "number" in row &&
          "hex" in row
        ) {
          if (
            !row.file.trim() ||
            !row.text.trim() ||
            !row.number.trim() ||
            !row.hex.trim()
          ) {
            return;
          }
          if (row.hex.length !== 32) {
            return;
          }
          if (isNaN(parseInt(row.number, 10))) {
            return;
          }
          parsedLines.push({
            text: row.text,
            number: row.number,
            hex: row.hex,
          });
        }
      })
      .on("end", () => {
        resolve(parsedLines);
      });
  });
};

export { fetchData, getFileData, parseData };
