import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ProjectLinks } from "../../src/components/ProjectLinks";
import { testData } from "../testData";

const project = testData.projects[0];

describe("ProjectLinks component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <ProjectLinks projectInfo={project.info} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
