import { getProject } from "../../src/utils/getProject";
import { testData } from "../testData";

const project = testData.projects[0];

test("should get project", () => {
  const result = getProject(testData, project.owner, project.repo);

  expect(result).toMatchSnapshot();
});

test("should not get project if there is no existing owner", () => {
  const result = getProject(testData, "", project.repo);

  expect(result).toBeUndefined();
});

test("should not get project if there is no existing repo", () => {
  const result = getProject(testData, project.owner, "");

  expect(result).toBeUndefined();
});
