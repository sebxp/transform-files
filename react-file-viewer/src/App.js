import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import NotFound from "./components/FileNotFound";
import Navbar from "./components/Navbar";
import FileDetailsPage from "./pages/FileListDetails";
import FileListPage from "./pages/FileListPage";
import HomePage from "./pages/HomePage";

/**
 * App component that sets up the main application routes using React Router.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Renders the App component with defined routes
 * <App />
 *
 * Routes:
 * - "/" renders HomePage component
 * - "/file" renders FileDetailsPage component
 * - "/filenames" renders FileListPage component
 * - "/404" renders NotFound component
 * - "*" renders NotFound component for any undefined routes
 */
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/file" element={<FileDetailsPage />} />
        <Route path="/filenames" element={<FileListPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
