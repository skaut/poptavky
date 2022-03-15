import renderer from "react-test-renderer"
import { IssuesList } from "./IssuesList"
import { testData } from "../../testData"
import { MemoryRouter } from "react-router-dom"

describe("IssuesList page", () => {
  it("should render correctly", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <IssuesList data={testData} />
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
