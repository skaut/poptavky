import renderer from "react-test-renderer"
import { ProjectsList } from "./ProjectsList"
import { testData } from "../../testData"
import { MemoryRouter } from "react-router-dom"

describe("ProjectsList page", () => {
  it("should render correctly", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <ProjectsList data={testData} />
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
