import React from "react"
import renderer from "react-test-renderer"
import { MemoryRouter } from "react-router-dom"
import { ScrollToTop } from "./ScrollToTop"

global.scrollTo = jest.fn()

describe("ScrollToTop", () => {
  let wrapper
  let history
  beforeEach(() => {
    wrapper = renderer.create(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>
    )
    history = wrapper.getInstance().history
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("calls window.scrollTo when route changes", () => {
    expect(global.scrollTo).not.toHaveBeenCalled()
    history.push("/new-url")
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
