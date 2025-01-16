import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import FileDataTable from "../components/FileDataTable";
import NotFound from "../components/FileNotFound";
import { setFileData } from "../redux/filesSlice";

function FileDetailsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const fileName = location.state?.fileName || "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["fileDetails", fileName],
    queryFn: async () => {
      const response = await axios.get(`/files/data?fileName=${fileName}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (data) dispatch(setFileData([data]));
  }, [dispatch, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    if (error.status === 404) {
      return <NotFound message={`The file ${fileName} does not exist`} />;
    }
    return <div>Error loading file data.</div>;
  }

  return <FileDataTable />;
}

export default FileDetailsPage;
