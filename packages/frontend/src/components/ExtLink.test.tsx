import renderer from "react-test-renderer"
import { ExtLink } from "./ExtLink"

describe("ExtLink component", () => {
  it("should renders correctly", () => {
    const tree = renderer
      .create(<ExtLink href="http://www.somewhere.com">Link somewhere</ExtLink>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly with title", () => {
    const tree = renderer
      .create(
        <ExtLink href="http://www.somewhere.com" title="myTitle">
          Link somewhere
        </ExtLink>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly with custom class", () => {
    const tree = renderer
      .create(
        <ExtLink href="http://www.somewhere.com" className="myClassName">
          Link somewhere
        </ExtLink>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly with target self", () => {
    const tree = renderer
      .create(
        <ExtLink href="http://www.somewhere.com" targetSelf>
          Link somewhere
        </ExtLink>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
