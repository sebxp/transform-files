import { fetchData, getFileData, parseData } from '../services/file.service.js'

const getFilesList = async (req, res) => {
  try {
    const fileNames = await fetchData()
    res.status(200).send(fileNames)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

const getFiles = async (req, res) => {
  try {
    if (req.query?.fileName) {
      const fileData = await searchFileData(req.query.fileName)
      if (!fileData) {
        res.status(404).send('File not found')
        return
      }
      res.status(200).send(fileData)
      return
    }
    const fileDetails = await getFilesData()
    res.status(200).send(fileDetails)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

const getFilesData = async () => {
  const fileNames = await fetchData()
  const fileDetails = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileData = await getFileData(fileName)
      if (!fileData) return
      const parsedData = await parseData(fileData)
      if (!parsedData.length) return
      return {
        file: fileName,
        lines: parsedData
      }
    })
  )
  return fileDetails.filter((file) => file)
}

const searchFileData = async (fileName) => {
  const fileData = await getFileData(fileName)
  if (!fileData) return
  const parsedData = await parseData(fileData)
  if (!parsedData.length) return
  return {
    file: fileName,
    lines: parsedData
  }
}

export { getFiles, getFilesList }
