import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ColoredTag } from "../../src/components/ColoredTag";

describe("ColoredTag component", () => {
  test("should render correctly", () => {
    const { container } = render(<ColoredTag>Tag</ColoredTag>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
