import { configureStore } from "@reduxjs/toolkit";
import * as ReactQuery from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import FileListPage from "../src/pages/FileListPage";
import filesReducer from "../src/redux/filesSlice";

const mockFilenames = ["file1", "file2", "file3"];

jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});
const mockedUseNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedUseNavigate,
}));

const queryClient = new ReactQuery.QueryClient();

describe("FileListPage", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        files: filesReducer,
      },
      preloadedState: {
        files: {
          fileData: [],
          fileList: [],
        },
      },
    });
  });

  it("renders loading state", () => {
    ReactQuery.useQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <FileListPage />
          </BrowserRouter>
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    ReactQuery.useQuery.mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <FileListPage />
          </BrowserRouter>
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("Error loading file list.")).toBeInTheDocument();
  });

  it("renders file list table when data is available", async () => {
    ReactQuery.useQuery.mockReturnValue({
      data: mockFilenames,
      error: null,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <FileListPage />
          </BrowserRouter>
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("File List")).toBeInTheDocument();
    await waitFor(() => {
      const rows = screen.getAllByTestId("data-row");
      expect(rows).toHaveLength(mockFilenames.length);
    });
  });

  it("handles row click", async () => {
    const navigate = mockedUseNavigate;
    ReactQuery.useQuery.mockReturnValue({
      data: mockFilenames,
      error: null,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <FileListPage />
          </BrowserRouter>
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("file1"));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(`/file?fileName=file1`, {
        state: { fileName: "file1" },
      });
    });
  });
});
