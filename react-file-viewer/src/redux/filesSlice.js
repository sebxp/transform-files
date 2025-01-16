import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    fileData: [],
    fileList: [],
  },
  reducers: {
    setFileData: (state, action) => {
      state.fileData = action.payload;
    },
    setFileList: (state, action) => {
      state.fileList = action.payload;
    },
  },
});

export const { setFileData, setFileList } = filesSlice.actions;
export default filesSlice.reducer;
