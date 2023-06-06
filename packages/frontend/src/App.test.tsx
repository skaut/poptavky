import { mocked } from "jest-mock"
import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"
import * as swr from "swr"

import { App } from "./App"
import { testData } from "./testData"

jest.mock("swr")

describe("App", () => {
  beforeAll(() => {
    jest.spyOn(window, "scrollTo").mockImplementation()
  })

  test("should render correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    })
    const tree = renderer
      .create(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test("should render projects correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    })
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/projekty"]}>
          <App />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test("should render project listing correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    })
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/skaut/skaut-google-drive-gallery"]}>
          <App />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test("should render issue listing correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    })
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/skaut/skaut-google-drive-gallery/3"]}>
          <App />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test("should handle error gracefully", () => {
    mocked(swr).default.mockReturnValue({
      data: undefined,
      error: true,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    })
    const tree = renderer
      .create(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
