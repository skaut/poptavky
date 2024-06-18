import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { ProjectsList } from "../../src/pages/ProjectsList";
import { testData } from "../testData";

describe("ProjectsList page", () => {
  test("should render correctly", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <ProjectsList data={testData} />
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
