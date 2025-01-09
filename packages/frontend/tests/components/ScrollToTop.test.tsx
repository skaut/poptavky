import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import { ScrollToTop } from "../../src/components/ScrollToTop";

describe("ScrollToTop", () => {
  test("calls window.scrollTo when route changes", async () => {
    expect.assertions(3);

    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Function mock
    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
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

    expect(scrollSpy).toHaveBeenCalledTimes(1);

    await user.click(getByText("Linkage"));

    expect(scrollSpy).toHaveBeenCalledTimes(2);
    expect(scrollSpy).toHaveBeenLastCalledWith(0, 0);
  });
});
