import renderer from "react-test-renderer";

import { Button } from "../../src/components/Button";

describe("Button component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(<Button href="http://www.somewhere.com">Link somewhere</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render correctly with title", () => {
    const tree = renderer
      .create(
        <Button href="http://www.somewhere.com" title="myTitle">
          Link somewhere
        </Button>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render correctly with custom class", () => {
    const tree = renderer
      .create(
        <Button className="myClassName" href="http://www.somewhere.com">
          Link somewhere
        </Button>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render correctly with target self", () => {
    const tree = renderer
      .create(
        <Button href="http://www.somewhere.com" targetSelf>
          Link somewhere
        </Button>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
