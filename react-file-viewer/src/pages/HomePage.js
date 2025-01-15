import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FileDataTable from "../components/FileDataTable";
import { setFileData } from "../redux/filesSlice";

function HomePage() {
  const isFileDetails = useSelector((state) => state.files.isFileDetails);
  const dispatch = useDispatch();
  const { error, isLoading } = useQuery({
    queryKey: ["fileData"],
    queryFn: async () => {
      const response = await axios.get("/files/data");
      dispatch(setFileData(response.data));
      return response.data;
    },
    enabled: !isFileDetails,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading file data.</div>;

  return <FileDataTable />;
}

export default HomePage;
