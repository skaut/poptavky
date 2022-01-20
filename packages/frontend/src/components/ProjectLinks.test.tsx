import renderer from "react-test-renderer"
import { ProjectLinks } from "./ProjectLinks"
import { testData } from "../testData"
import { MemoryRouter } from "react-router-dom"

const project = testData.projects[0]

describe("ProjectLinks component", () => {
  it("should renders correctly", () => {
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
