import { expect, test } from "vitest";

import { getProject } from "../../src/utils/getProject";
import { testData } from "../testData";

const project = testData.projects[0];

test("should get project", () => {
  expect.assertions(1);

  const result = getProject(testData, project.owner, project.repo);

  expect(result).toMatchSnapshot();
});

test("should not get project if there is no existing owner", () => {
  expect.assertions(1);

  const result = getProject(testData, "", project.repo);

  expect(result).toBeUndefined();
});

test("should not get project if there is no existing repo", () => {
  expect.assertions(1);

  const result = getProject(testData, project.owner, "");

  expect(result).toBeUndefined();
});
