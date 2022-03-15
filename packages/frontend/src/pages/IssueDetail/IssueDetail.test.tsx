import renderer from "react-test-renderer"
import { IssueDetail } from "./IssueDetail"
import { testData } from "../../testData"
import { MemoryRouter, Route, Routes } from "react-router-dom"

const project = testData.projects[0]
const issue = project.issues[0]

describe("IssueDetail page", () => {
  it("should render correctly", () => {
    const tree = renderer.create(
      <MemoryRouter
        initialEntries={[`/${project.owner}/${project.repo}/${issue.number}`]}
      >
        <Routes>
          <Route
            path="/:owner/:project/:issue"
            element={<IssueDetail data={testData} />}
          />
        </Routes>
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })

  it("should render correctly if there is no related issue", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/${project.owner}/${project.repo}/0`]}>
        <Routes>
          <Route
            path="/:owner/:project/:issue"
            element={<IssueDetail data={testData} />}
          />
        </Routes>
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
