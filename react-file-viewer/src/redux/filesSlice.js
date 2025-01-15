import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    fileData: [],
    fileList: [],
    isFileDetails: false,
  },
  reducers: {
    setFileData: (state, action) => {
      state.fileData = action.payload;
    },
    setFileList: (state, action) => {
      state.fileList = action.payload;
    },
    setIsFileDetails: (state, action) => {
      state.isFileDetails = action.payload;
    },
  },
});

export const { setFileData, setFileList, setIsFileDetails } =
  filesSlice.actions;
export default filesSlice.reducer;
