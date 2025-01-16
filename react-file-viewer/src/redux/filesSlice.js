import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing file-related state.
 *
 * @namespace filesSlice
 * @property {Object} initialState - The initial state of the slice.
 * @property {Array} initialState.fileData - Array to store file data.
 * @property {Array} initialState.fileList - Array to store the list of files.
 * @property {Object} reducers - The reducers for handling state changes.
 * @property {Function} reducers.setFileData - Reducer to set the file data.
 * @property {Function} reducers.setFileList - Reducer to set the file list.
 * @function reducers.setFileData
 * @param {Object} state - The current state of the slice.
 * @param {Object} action - The action dispatched.
 * @param {Array} action.payload - The new file data to set.
 * @function reducers.setFileList
 * @param {Object} state - The current state of the slice.
 * @param {Object} action - The action dispatched.
 * @param {Array} action.payload - The new file list to set.
 */
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
