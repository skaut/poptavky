import { getIssuesWithProjectInfo } from "../../src/utils/getAllIssues";
import { testData } from "../testData";

test("should get all issues", () => {
  const result = getIssuesWithProjectInfo(testData);
  expect(result).toMatchSnapshot();
});

test("should all issues except one", () => {
  const result = getIssuesWithProjectInfo(testData, { omitIssueNumber: 5 });
  expect(result).toMatchSnapshot();
});
