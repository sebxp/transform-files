import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./components/FileNotFound";
import Navbar from "./components/Navbar";
import FileListPage from "./pages/FileListPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/file" element={<HomePage />} />
        <Route path="/filenames" element={<FileListPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
