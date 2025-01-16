import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FileDataTable from "../components/FileDataTable";
import { setFileData } from "../redux/filesSlice";

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
