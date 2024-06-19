import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Navigation } from "../../src/components/Navigation";

describe("Navigation component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation
          items={[
            {
              title: "Poptávky",
              link: "/",
            },
            {
              title: "Projekty",
              link: "/projekty",
            },
          ]}
        />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test("should render correctly wyth active item", () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation
          items={[
            {
              title: "Poptávky",
              link: "/",
            },
            {
              title: "Projekty",
              link: "/projekty",
              isActive: true,
            },
          ]}
        />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
