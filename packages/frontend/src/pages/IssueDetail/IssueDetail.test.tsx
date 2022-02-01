import renderer from "react-test-renderer"
import { IssueDetail } from "./IssueDetail"
import { testData } from "../../testData"
import { MemoryRouter, Route } from "react-router-dom"

const project = testData.projects[0]
const issue = project.issues[0]

describe("IssueDetail page", () => {
  it("should renders correctly", () => {
    const tree = renderer.create(
      <MemoryRouter
        initialEntries={[`/${project.owner}/${project.repo}/${issue.number}`]}
      >
        <Route
          path="/:owner/:project/:issue"
          render={(props) => <IssueDetail {...props} data={testData} />}
        />
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly if there is no related issue", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/${project.owner}/${project.repo}/0`]}>
        <Route
          path="/:owner/:project/:issue"
          render={(props) => <IssueDetail {...props} data={testData} />}
        />
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
