import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import { testData } from "../../testData"
import { IssuesList } from "./IssuesList"

describe("IssuesList page", () => {
  test("should render correctly", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <IssuesList data={testData} />
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
