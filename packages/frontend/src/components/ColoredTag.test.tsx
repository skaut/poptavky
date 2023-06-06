import renderer from "react-test-renderer"

import { ColoredTag } from "./ColoredTag"

describe("ColoredTag component", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<ColoredTag>Tag</ColoredTag>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
