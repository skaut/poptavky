import renderer from "react-test-renderer"
import { MemoryRouter } from "react-router-dom"
import { App } from "./App"
import { testData } from "./testData"
import { mocked } from "jest-mock"

import * as swr from "swr"

jest.mock("swr")

describe("App", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn()
  })

  it("should render correctly", async () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      mutate: jest.fn(),
      isValidating: false,
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

  it("should render projects correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      mutate: jest.fn(),
      isValidating: false,
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

  it("should render project listing correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      mutate: jest.fn(),
      isValidating: false,
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

  it("should render issue listing correctly", () => {
    mocked(swr).default.mockReturnValue({
      data: testData,
      mutate: jest.fn(),
      isValidating: false,
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

  it("should handle error gracefully", async () => {
    mocked(swr).default.mockReturnValue({
      error: true,
      mutate: jest.fn(),
      isValidating: false,
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
