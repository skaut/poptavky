import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import { testData } from "../testData"
import { ProjectLinks } from "./ProjectLinks"

const project = testData.projects[0]

describe("ProjectLinks component", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ProjectLinks projectInfo={project.info} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
