import renderer from "react-test-renderer"
import { Issue } from "./Issue"
import { testData } from "../testData"
import { getIssueWithProject } from "../utils/getIssueWithProject"
import { MemoryRouter } from "react-router-dom"

const project = testData.projects[0]
const issue = project.issues[0]
const issueWithProject = getIssueWithProject(
  testData,
  project.owner,
  project.repo,
  issue.number
)

describe("Issue component", () => {
  it("should renders correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Issue issue={issueWithProject!} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly without tags", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Issue issue={issueWithProject!} hideTags />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
