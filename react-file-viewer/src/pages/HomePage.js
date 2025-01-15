import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import FileDataTable from "../components/FileDataTable";

function HomePage() {
  const { data, error, isLoading } = useQuery(["fileData"], async () => {
    const response = await axios.get("/files/data");
    return response.data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading file data.</div>;

  return <FileDataTable data={data} />;
}

export default HomePage;
