import renderer from "react-test-renderer"
import { Project } from "./Project"
import { testData } from "../testData"
import { MemoryRouter } from "react-router-dom"

const project = testData.projects[0]

describe("Project component", () => {
  it("should renders correctly", () => {
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
