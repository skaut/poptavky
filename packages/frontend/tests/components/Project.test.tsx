import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";

import { Project } from "../../src/components/Project";
import { testData } from "../testData";

const project = testData.projects[0];

describe("Project component", () => {
  test("should render correctly", () => {
    expect.assertions(1);

    const { container } = render(
      <MemoryRouter>
        <Project project={project} />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
