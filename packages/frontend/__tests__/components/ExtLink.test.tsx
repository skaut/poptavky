import renderer from "react-test-renderer";

import { ExtLink } from "../../src/components/ExtLink";

describe("ExtLink component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(<ExtLink href="http://www.somewhere.com">Link somewhere</ExtLink>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render correctly with title", () => {
    const tree = renderer
      .create(
        <ExtLink href="http://www.somewhere.com" title="myTitle">
          Link somewhere
        </ExtLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render correctly with custom class", () => {
    const tree = renderer
      .create(
        <ExtLink className="myClassName" href="http://www.somewhere.com">
          Link somewhere
        </ExtLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render correctly with target self", () => {
    const tree = renderer
      .create(
        <ExtLink href="http://www.somewhere.com" targetSelf>
          Link somewhere
        </ExtLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
