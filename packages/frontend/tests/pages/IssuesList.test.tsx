import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";

import { IssuesList } from "../../src/pages/IssuesList";
import { testData } from "../testData";

describe("IssuesList page", () => {
  test("should render correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <IssuesList data={testData} />
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
