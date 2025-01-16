import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import FileDataTable from "../components/FileDataTable";
import NotFound from "../components/FileNotFound";
import { setFileData } from "../redux/filesSlice";

/**
 * FileDetailsPage component fetches and displays the details of a file.
 *
 * This component uses the `useLocation` hook to get the file name from the location state,
 * and the `useQuery` hook to fetch the file details from the server.
 *
 * If the file details are successfully fetched, it dispatches an action to set the file data in the store.
 *
 * The component handles loading and error states, displaying appropriate messages.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
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
    if (error.response?.status === 404) {
      return <NotFound message={`The file ${fileName} does not exist`} />;
    }
    return <div>Error loading file data.</div>;
  }

  return <FileDataTable />;
}

export default FileDetailsPage;
