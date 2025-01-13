import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ExtLink } from "../../src/components/ExtLink";

describe("ExtLink component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <ExtLink href="http://www.somewhere.com">Link somewhere</ExtLink>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly with title", () => {
    const { container } = render(
      <ExtLink href="http://www.somewhere.com" title="myTitle">
        Link somewhere
      </ExtLink>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly with custom class", () => {
    const { container } = render(
      <ExtLink className="myClassName" href="http://www.somewhere.com">
        Link somewhere
      </ExtLink>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly with target self", () => {
    const { container } = render(
      <ExtLink href="http://www.somewhere.com" targetSelf>
        Link somewhere
      </ExtLink>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
