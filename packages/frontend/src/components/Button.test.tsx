import renderer from "react-test-renderer"
import { Button } from "./Button"

describe("Button component", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(<Button href="http://www.somewhere.com">Link somewhere</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render correctly with title", () => {
    const tree = renderer
      .create(
        <Button href="http://www.somewhere.com" title="myTitle">
          Link somewhere
        </Button>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render correctly with custom class", () => {
    const tree = renderer
      .create(
        <Button href="http://www.somewhere.com" className="myClassName">
          Link somewhere
        </Button>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render correctly with target self", () => {
    const tree = renderer
      .create(
        <Button href="http://www.somewhere.com" targetSelf>
          Link somewhere
        </Button>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
