import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, test } from "vitest";

import { ProjectDetail } from "../../src/pages/ProjectDetail";
import { testData } from "../testData";

const project = testData.projects[0];

describe("ProjectDetail page", () => {
  test("should render correctly", () => {
    expect.assertions(1);

    const { container } = render(
      <MemoryRouter initialEntries={[`/${project.owner}/${project.repo}`]}>
        <Routes>
          <Route
            element={<ProjectDetail data={testData} />}
            path="/:owner/:project"
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly if there is no related issue", () => {
    expect.assertions(1);

    const { container } = render(
      <MemoryRouter initialEntries={[`/owner/repo`]}>
        <Routes>
          <Route
            element={<ProjectDetail data={testData} />}
            path="/:owner/:project"
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
