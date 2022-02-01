import renderer from "react-test-renderer"
import { testData } from "../../testData"
import { MemoryRouter, Route } from "react-router-dom"
import { ProjectDetail } from "./ProjectDetail"

const project = testData.projects[0]

describe("ProjectDetail page", () => {
  it("should renders correctly", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/${project.owner}/${project.repo}`]}>
        <Route
          path="/:owner/:project"
          render={(props) => <ProjectDetail {...props} data={testData} />}
        />
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly if there is no related issue", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={[`/owner/repo`]}>
        <Route
          path="/:owner/:project"
          render={(props) => <ProjectDetail {...props} data={testData} />}
        />
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
