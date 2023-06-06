import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import { Project } from "../../src/components/Project"
import { testData } from "../testData"

const project = testData.projects[0]

describe("Project component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Project project={project} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
