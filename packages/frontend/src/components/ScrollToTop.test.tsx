import userEvent from "@testing-library/user-event"
import { Link, MemoryRouter, Route, Routes } from "react-router-dom"
import renderer from "react-test-renderer"

import { ScrollToTop } from "./ScrollToTop"

global.scrollTo = jest.fn()

describe("ScrollToTop", () => {
  it("calls window.scrollTo when route changes", async () => {
    const user = userEvent.setup()
    const root = renderer.create(
      <MemoryRouter initialEntries={["/home"]}>
        <ScrollToTop />
        <Routes>
          <Route
            path="home"
            element={
              <Link to="/about" className="the-link">
                Linkage
              </Link>
            }
          />
          <Route path="about" element={<h1>About</h1>} />
        </Routes>
      </MemoryRouter>
    )
    expect(global.scrollTo).not.toHaveBeenCalled()
    const link = root.root.findByProps({ className: "the-link" })
    await user.click(link.instance as Element)
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
