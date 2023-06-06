import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import { testData } from "../testData"
import { getIssueWithProject } from "../utils/getIssueWithProject"
import { Issue } from "./Issue"

const project = testData.projects[0]
const issue = project.issues[0]
const issueWithProject = getIssueWithProject(
  testData,
  project.owner,
  project.repo,
  issue.number
)

describe("Issue component", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Issue issue={issueWithProject!} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render correctly without tags", () => {
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
