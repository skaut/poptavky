import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";

import { ScrollToTop } from "../../src/components/ScrollToTop";

global.scrollTo = jest.fn();

describe("ScrollToTop", () => {
  test("calls window.scrollTo when route changes", async () => {
    expect.assertions(3);
    const user = userEvent.setup();
    const { getByText } = render(
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
      </MemoryRouter>,
    );
    expect(global.scrollTo).toHaveBeenCalledTimes(1);
    await user.click(getByText("Linkage"));
    expect(global.scrollTo).toHaveBeenCalledTimes(2);
    expect(global.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });
});
