import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileListTable from "../components/FileListTable";
import {
  setFileData,
  setFileList,
  setIsFileDetails,
} from "../redux/filesSlice";

function FileListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useQuery({
    queryKey: ["fileList"],
    queryFn: async () => {
      const response = await axios.get("/files/list");
      dispatch(setFileList(response.data));
      return response.data;
    },
  });

  const handleRowClick = async (fileName) => {
    try {
      const response = await axios.get(`/files/data?fileName=${fileName}`);
      dispatch(setFileData([response.data]));
      dispatch(setIsFileDetails(true));
      navigate(`/file?fileName=${fileName}`); // Navigate to the details page
    } catch (err) {
      dispatch(setIsFileDetails(false));
      if (err.response && err.response.status === 404) {
        // Redirect to a 404 page if the file is not found
        navigate("/404", {
          state: { message: `File "${fileName}" not found.` },
        });
      } else {
        console.error("Error fetching file data:", err.message);
        alert("An unexpected error occurred while fetching file data.");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading file list.</div>;

  return <FileListTable onRowClick={handleRowClick} />;
}

export default FileListPage;
