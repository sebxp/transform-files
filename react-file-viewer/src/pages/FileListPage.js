import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import FileListTable from "../components/FileListTable";
import { setFileData } from "../redux/filesSlice";

function FileListPage() {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery(["fileList"], async () => {
    const response = await axios.get("/files/list");
    return response.data;
  });

  const handleRowClick = async (fileName) => {
    const response = await axios.get(`/files/data?fileName=${fileName}`);
    dispatch(setFileData(response.data));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading file list.</div>;

  return <FileListTable data={data} onRowClick={handleRowClick} />;
}

export default FileListPage;
