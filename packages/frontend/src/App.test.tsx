import renderer from "react-test-renderer"
import { MemoryRouter } from "react-router-dom"
import { App } from "./App"
import { testData } from "./testData"
import { mocked } from "jest-mock";

import * as swr from "swr";

jest.mock("swr")

describe("App", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  })

  it("should renders correctly", async () => {
    mocked(swr).default.mockReturnValue({data: testData, mutate: jest.fn(), isValidating: false})
    const tree = renderer
      .create(<MemoryRouter><App /></MemoryRouter>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders projects correctly", () => {
    mocked(swr).default.mockReturnValue({data: testData, mutate: jest.fn(), isValidating: false})
    const tree = renderer
      .create(<MemoryRouter initialEntries={["/projekty"]}><App /></MemoryRouter>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders project listing correctly", () => {
    mocked(swr).default.mockReturnValue({data: testData, mutate: jest.fn(), isValidating: false})
    const tree = renderer
      .create(<MemoryRouter initialEntries={["/skaut/skaut-google-drive-gallery"]}><App /></MemoryRouter>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders issue listing correctly", () => {
    mocked(swr).default.mockReturnValue({data: testData, mutate: jest.fn(), isValidating: false})
    const tree = renderer
      .create(<MemoryRouter initialEntries={["/skaut/skaut-google-drive-gallery/3"]}><App /></MemoryRouter>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should handle error gracefully", async () => {
    mocked(swr).default.mockReturnValue({error: true, mutate: jest.fn(), isValidating: false})
    const tree = renderer
      .create(<MemoryRouter><App /></MemoryRouter>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
