import { MemoryRouter, Route, Routes } from "react-router-dom";
import renderer from "react-test-renderer";

import { ProjectDetail } from "../../src/pages/ProjectDetail";
import { testData } from "../testData";

const project = testData.projects[0];

describe("ProjectDetail page", () => {
  test("should render correctly", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/${project.owner}/${project.repo}`]}>
        <Routes>
          <Route
            element={<ProjectDetail data={testData} />}
            path="/:owner/:project"
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });

  test("should render correctly if there is no related issue", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/owner/repo`]}>
        <Routes>
          <Route
            element={<ProjectDetail data={testData} />}
            path="/:owner/:project"
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
