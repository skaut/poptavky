import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { IssuesList } from "../../src/components/IssuesList";
import { testData } from "../testData";

const project = testData.projects[0];

describe("IssuesList component", () => {
  test("should render correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <IssuesList issues={project.issues} project={project} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test("should render correctly without link", () => {
    const { container } = render(
      <MemoryRouter>
        <IssuesList
          issues={project.issues.map((issue) => ({
            description: issue.description,
            number: issue.number,
            title: issue.title,
          }))}
          project={project}
        />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
