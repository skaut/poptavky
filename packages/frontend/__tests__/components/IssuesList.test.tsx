import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import { IssuesList } from "../../src/components/IssuesList"
import { testData } from "../testData"

const project = testData.projects[0]

describe("IssuesList component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <IssuesList issues={project.issues} project={project} />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("should render correctly without link", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <IssuesList
            issues={project.issues.map((issue) => ({
              ...issue,
              link: undefined,
            }))}
            project={project}
          />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
