import { configureStore } from "@reduxjs/toolkit";
import * as ReactQuery from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import HomePage from "../src/pages/HomePage";
import filesReducer from "../src/redux/filesSlice";

const mockFileData = {
  file: "file1",
  lines: [{ text: "line1", number: 1, hex: "0x01" }],
};

jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});

jest.mock("axios");

const queryClient = new ReactQuery.QueryClient();

describe("HomePage", () => {
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
    ReactQuery.useQuery.mockReturnValue({ isLoading: true });

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <HomePage />
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    ReactQuery.useQuery.mockReturnValue({ error: true });

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <HomePage />
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("Error loading file data.")).toBeInTheDocument();
  });

  it("renders FileDataTable when data is loaded", async () => {
    const data = [mockFileData];
    ReactQuery.useQuery.mockReturnValue({ data });

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <HomePage />
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("File Data")).toBeInTheDocument();
    });
    await waitFor(() => {
      const rows = screen.getAllByTestId("data-row");
      expect(rows).toHaveLength(data.length);
    });
  });

  it("dispatches setFileData action when data is loaded", async () => {
    const data = [mockFileData];
    ReactQuery.useQuery.mockReturnValue({ data });

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <HomePage />
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    await waitFor(() => {
      const state = store.getState();
      expect(JSON.stringify(state.files.fileData)).toBe(JSON.stringify(data));
    });
  });
});
