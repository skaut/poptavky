import { expect, test } from "vitest";

import { getIssuesWithProjectInfo } from "../../src/utils/getAllIssues";
import { testData } from "../testData";

test("should get all issues", () => {
  expect.assertions(1);

  const result = getIssuesWithProjectInfo(testData);

  expect(result).toMatchSnapshot();
});

test("should all issues except one", () => {
  expect.assertions(1);

  const result = getIssuesWithProjectInfo(testData, { omitIssueNumber: 5 });

  expect(result).toMatchSnapshot();
});
