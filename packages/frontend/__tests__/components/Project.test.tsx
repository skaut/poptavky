import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Project } from "../../src/components/Project";
import { testData } from "../testData";

const project = testData.projects[0];

describe("Project component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <Project project={project} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
