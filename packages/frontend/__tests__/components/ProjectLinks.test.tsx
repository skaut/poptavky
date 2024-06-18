import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { ProjectLinks } from "../../src/components/ProjectLinks";
import { testData } from "../testData";

const project = testData.projects[0];

describe("ProjectLinks component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ProjectLinks projectInfo={project.info} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
