import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test } from "vitest";

import { IssueDetail } from "../../src/pages/IssueDetail";
import { testData } from "../testData";

const project = testData.projects[0];
const issue = project.issues[0];

describe("IssueDetail page", () => {
  test("should render correctly", () => {
    expect.assertions(1);

    const { container } = render(
      <MemoryRouter
        initialEntries={[
          `/${project.owner}/${project.repo}/${issue.number.toString()}`,
        ]}
      >
        <Routes>
          <Route
            element={<IssueDetail data={testData} />}
            path="/:owner/:project/:issue"
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly if there is no related issue", () => {
    expect.assertions(1);

    const { container } = render(
      <MemoryRouter initialEntries={[`/${project.owner}/${project.repo}/0`]}>
        <Routes>
          <Route
            element={<IssueDetail data={testData} />}
            path="/:owner/:project/:issue"
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
