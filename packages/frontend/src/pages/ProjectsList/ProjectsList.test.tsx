import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import { testData } from "../../testData"
import { ProjectsList } from "./ProjectsList"

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
