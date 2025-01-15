import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FileListPage from "./pages/FileListPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/filenames" element={<FileListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
