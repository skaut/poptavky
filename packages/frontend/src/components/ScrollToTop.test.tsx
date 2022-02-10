import renderer from "react-test-renderer"
import { unstable_HistoryRouter as Router } from "react-router-dom"
import { ScrollToTop } from "./ScrollToTop"
import { createMemoryHistory } from "history"

global.scrollTo = jest.fn()

describe("ScrollToTop", () => {
  it("calls window.scrollTo when route changes", () => {
    const history = createMemoryHistory()
    renderer.create(
      <Router history={history}>
        <ScrollToTop />
      </Router>
    )
    expect(global.scrollTo).not.toHaveBeenCalled()
    renderer.act(() => {
      history.push("/some/route")
    })
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
