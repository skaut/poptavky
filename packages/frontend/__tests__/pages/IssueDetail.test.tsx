import { MemoryRouter, Route, Routes } from "react-router-dom"
import renderer from "react-test-renderer"

import { IssueDetail } from "../../src/pages/IssueDetail"
import { testData } from "../testData"

const project = testData.projects[0]
const issue = project.issues[0]

describe("IssueDetail page", () => {
  test("should render correctly", () => {
    const tree = renderer.create(
      <MemoryRouter
        initialEntries={[`/${project.owner}/${project.repo}/${issue.number}`]}
      >
        <Routes>
          <Route
            element={<IssueDetail data={testData} />}
            path="/:owner/:project/:issue"
          />
        </Routes>
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })

  test("should render correctly if there is no related issue", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/${project.owner}/${project.repo}/0`]}>
        <Routes>
          <Route
            element={<IssueDetail data={testData} />}
            path="/:owner/:project/:issue"
          />
        </Routes>
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
