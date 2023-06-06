import userEvent from "@testing-library/user-event"
import { Link, MemoryRouter, Route, Routes } from "react-router-dom"
import renderer from "react-test-renderer"

import { ScrollToTop } from "./ScrollToTop"

global.scrollTo = jest.fn()

describe("ScrollToTop", () => {
  test("calls window.scrollTo when route changes", async () => {
    expect.assertions(2)
    const user = userEvent.setup()
    const root = renderer.create(
      <MemoryRouter initialEntries={["/home"]}>
        <ScrollToTop />
        <Routes>
          <Route
            element={
              <Link className="the-link" to="/about">
                Linkage
              </Link>
            }
            path="home"
          />
          <Route element={<h1>About</h1>} path="about" />
        </Routes>
      </MemoryRouter>
    )
    expect(global.scrollTo).not.toHaveBeenCalled()
    const link = root.root.findByProps({ className: "the-link" })
    await user.click(link.instance as Element)
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
