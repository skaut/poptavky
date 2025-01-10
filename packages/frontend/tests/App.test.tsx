import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as swr from "swr";
import { beforeAll, describe, expect, test, vi } from "vitest";

import { App } from "../src/App";
import { testData } from "./testData";

vi.mock("swr");

describe("App", () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Function mock
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  test("should render correctly", () => {
    expect.assertions(1);

    vi.mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render projects correctly", () => {
    expect.assertions(1);

    vi.mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });
    const { container } = render(
      <MemoryRouter initialEntries={["/projekty"]}>
        <App />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render project listing correctly", () => {
    expect.assertions(1);

    vi.mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });
    const { container } = render(
      <MemoryRouter initialEntries={["/skaut/skaut-google-drive-gallery"]}>
        <App />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render issue listing correctly", () => {
    expect.assertions(1);

    vi.mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });
    const { container } = render(
      <MemoryRouter initialEntries={["/skaut/skaut-google-drive-gallery/3"]}>
        <App />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should handle error gracefully", () => {
    expect.assertions(1);

    vi.mocked(swr).default.mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
