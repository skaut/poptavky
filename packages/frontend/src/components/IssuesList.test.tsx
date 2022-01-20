import renderer from "react-test-renderer"
import { IssuesList } from "./IssuesList"
import { testData } from "../testData"
import { MemoryRouter } from "react-router-dom"

const project = testData.projects[0]

describe("IssuesList component", () => {
  it("should renders correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <IssuesList issues={project.issues} project={project} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
