import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FileDataTable from "../components/FileDataTable";
import { setFileData } from "../redux/filesSlice";

/**
 * HomePage component that fetches file data and displays it in a table.
 *
 * This component uses the `useQuery` hook to fetch file data from the server.
 * It dispatches the fetched data to the Redux store using the `setFileData` action.
 * While the data is being loaded, it displays a loading message.
 * If there is an error during the data fetching, it displays an error message.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function HomePage() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery({
    queryKey: ["fileData"],
    queryFn: async () => {
      const response = await axios.get("/files/data");
      return response.data;
    },
  });

  useEffect(() => {
    if (data) dispatch(setFileData(data));
  }, [dispatch, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading file data.</div>;

  return <FileDataTable />;
}

export default HomePage;
