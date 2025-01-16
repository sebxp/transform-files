import { fetchData, getFileData, parseData } from "../services/file.service.js";

/**
 * Asynchronously retrieves a list of file names and sends them in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const getFilesList = async (req, res) => {
  try {
    const fileNames = await fetchData();
    res.status(200).send(fileNames);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Retrieves file data based on the query parameter or returns all file details.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} [req.query.fileName] - The name of the file to search for.
 * @param {Object} res - The response object.
 *
 * @returns {Promise<void>} Sends the file data or file details as a response.
 *
 * @throws {Error} If an error occurs, sends a 500 status code with 'Internal Server Error'.
 */
const getFiles = async (req, res) => {
  try {
    if (req.query?.fileName) {
      const fileData = await searchFileData(req.query.fileName);
      if (!fileData) {
        res.status(404).send("File not found");
        return;
      }
      res.status(200).send(fileData);
      return;
    }
    const fileDetails = await getFilesData();
    res.status(200).send(fileDetails);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Asynchronously retrieves and processes file data.
 *
 * This function fetches file names, retrieves their data, parses the data,
 * and returns an array of objects containing the file name and its parsed lines.
 *
 * @async
 * @function getFilesData
 * @returns {Promise<Array<{file: string, lines: Array}>>} An array of objects with file names and their parsed lines.
 */
const getFilesData = async () => {
  const fileNames = await fetchData();
  const fileDetails = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileData = await getFileData(fileName);
      if (!fileData) return;
      const parsedData = await parseData(fileData);
      if (!parsedData.length) return;
      return {
        file: fileName,
        lines: parsedData,
      };
    })
  );
  return fileDetails.filter((file) => file);
};

/**
 * Searches for file data and parses it.
 *
 * @param {string} fileName - The name of the file to search for.
 * @returns {Promise<{file: string, lines: Array}>|undefined} An object containing the file name and parsed lines, or undefined if no data is found.
 */
const searchFileData = async (fileName) => {
  const fileData = await getFileData(fileName);
  if (!fileData) return;
  const parsedData = await parseData(fileData);
  if (!parsedData.length) return;
  return {
    file: fileName,
    lines: parsedData,
  };
};

export { getFiles, getFilesList };
