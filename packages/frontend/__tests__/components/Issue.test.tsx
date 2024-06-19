import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Issue } from "../../src/components/Issue";
import { getIssueWithProject } from "../../src/utils/getIssueWithProject";
import { testData } from "../testData";

const project = testData.projects[0];
const issue = project.issues[0];
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Checked in the test
const issueWithProject = getIssueWithProject(
  testData,
  project.owner,
  project.repo,
  issue.number,
)!;

describe("Issue component", () => {
  test("should render correctly", () => {
    expect(issue).not.toBeNull();
    const { container } = render(
      <MemoryRouter>
        <Issue issue={issueWithProject} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render correctly without tags", () => {
    const { container } = render(
      <MemoryRouter>
        <Issue hideTags issue={issueWithProject} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
