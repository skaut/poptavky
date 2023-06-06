import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import { testData } from "../testData"
import { Project } from "./Project"

const project = testData.projects[0]

describe("Project component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Project project={project} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
