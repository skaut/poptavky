import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AppNavigation } from "../../src/components/AppNavigation";

describe("AppNavigation component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <AppNavigation />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
