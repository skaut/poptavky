import renderer from "react-test-renderer"
import { testData } from "../../testData"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { ProjectDetail } from "./ProjectDetail"

const project = testData.projects[0]

describe("ProjectDetail page", () => {
  it("should renders correctly", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/${project.owner}/${project.repo}`]}>
        <Routes>
          <Route
            path="/:owner/:project"
            element={<ProjectDetail data={testData} />}
          />
        </Routes>
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly if there is no related issue", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/owner/repo`]}>
        <Routes>
          <Route
            path="/:owner/:project"
            element={<ProjectDetail data={testData} />}
          />
        </Routes>
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
