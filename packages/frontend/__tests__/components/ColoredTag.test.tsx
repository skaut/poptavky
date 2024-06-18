import renderer from "react-test-renderer";

import { ColoredTag } from "../../src/components/ColoredTag";

describe("ColoredTag component", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<ColoredTag>Tag</ColoredTag>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
