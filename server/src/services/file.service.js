import axios from "axios";
import csvParser from "csv-parser";

const API_URL = "https://echo-serv.tbxnet.com/v1/secret/";
const API_TOKEN = "aSuperSecretKey";

// Function to fetch filenames from external API
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

// Function to fetch file content from external API
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

// Function to parse file content
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
