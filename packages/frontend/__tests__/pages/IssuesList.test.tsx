import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { IssuesList } from "../../src/pages/IssuesList";
import { testData } from "../testData";

describe("IssuesList page", () => {
  test("should render correctly", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <IssuesList data={testData} />
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
