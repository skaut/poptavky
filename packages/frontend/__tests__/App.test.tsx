import { render } from "@testing-library/react";
import { mocked } from "jest-mock";
import { MemoryRouter } from "react-router-dom";
import * as swr from "swr";

import { App } from "../src/App";
import { testData } from "./testData";

jest.mock("swr");

describe("App", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  test("should render correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    });
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render projects correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    });
    const { container } = render(
      <MemoryRouter initialEntries={["/projekty"]}>
        <App />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render project listing correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    });
    const { container } = render(
      <MemoryRouter initialEntries={["/skaut/skaut-google-drive-gallery"]}>
        <App />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render issue listing correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    });
    const { container } = render(
      <MemoryRouter initialEntries={["/skaut/skaut-google-drive-gallery/3"]}>
        <App />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should handle error gracefully", () => {
    mocked(swr).default.mockReturnValue({
      data: undefined,
      error: true,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    });
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
