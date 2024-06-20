import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ProjectsList } from "../../src/pages/ProjectsList";
import { testData } from "../testData";

describe("ProjectsList page", () => {
  test("should render correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <ProjectsList data={testData} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
