import renderer from "react-test-renderer"
import { App } from "./App"

describe("App", () => {
  it("should renders correctly", () => {
    const tree = renderer
      .create(<App />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  /*
  it("should renders correctly with title", () => {
    const tree = renderer
      .create(
        <Button href="http://www.somewhere.com" title="myTitle">
          Link somewhere
        </Button>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly with custom class", () => {
    const tree = renderer
      .create(
        <Button href="http://www.somewhere.com" className="myClassName">
          Link somewhere
        </Button>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should renders correctly with target self", () => {
    const tree = renderer
      .create(
        <Button href="http://www.somewhere.com" targetSelf>
          Link somewhere
        </Button>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  */
})
