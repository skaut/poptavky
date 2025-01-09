import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import { Navigation } from "../../src/components/Navigation";

describe("Navigation component", () => {
  test("should render correctly", () => {
    expect.assertions(1);

    const { container } = render(
      <MemoryRouter>
        <Navigation
          items={[
            {
              link: "/",
              title: "Poptávky",
            },
            {
              link: "/projekty",
              title: "Projekty",
            },
          ]}
        />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly with active item", () => {
    expect.assertions(1);

    const { container } = render(
      <MemoryRouter>
        <Navigation
          items={[
            {
              link: "/",
              title: "Poptávky",
            },
            {
              isActive: true,
              link: "/projekty",
              title: "Projekty",
            },
          ]}
        />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
