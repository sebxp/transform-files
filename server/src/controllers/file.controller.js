import { fetchData, getFileData, parseData } from "../services/file.service.js";

// Controller for fetching file data
const getFilesData = async (req, res) => {
  try {
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
    res.status(200).send(fileDetails.filter((file) => file));
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export { getFilesData };
