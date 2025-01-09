import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import { AppNavigation } from "../../src/components/AppNavigation";

describe("AppNavigation component", () => {
  test("should render correctly", () => {
    expect.assertions(1);

    const { container } = render(
      <MemoryRouter>
        <AppNavigation />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
