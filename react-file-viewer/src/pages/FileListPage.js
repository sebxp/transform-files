import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import FileListTable from "../components/FileListTable";
import { setFileData, setFileList } from "../redux/filesSlice";

function FileListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["fileList"],
    queryFn: async () => {
      const response = await axios.get("/files/list");
      return response.data;
    },
  });

  useEffect(() => {
    if (data) dispatch(setFileList(data));
  }, [dispatch, data]);

  const handleRowClick = async (fileName) => {
    dispatch(setFileData([]));
    navigate(`/file?fileName=${fileName}`, {
      state: { fileName },
    });
  };

  if (error) return <div>Error loading file list.</div>;
  if (isLoading) return <div>Loading...</div>;

  return <FileListTable onRowClick={handleRowClick} />;
}

export default FileListPage;
