import { render } from "@testing-library/react";

import { Button } from "../../src/components/Button";

describe("Button component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <Button href="http://www.somewhere.com">Link somewhere</Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly with title", () => {
    const { container } = render(
      <Button href="http://www.somewhere.com" title="myTitle">
        Link somewhere
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly with custom class", () => {
    const { container } = render(
      <Button className="myClassName" href="http://www.somewhere.com">
        Link somewhere
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly with target self", () => {
    const { container } = render(
      <Button href="http://www.somewhere.com" targetSelf>
        Link somewhere
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
