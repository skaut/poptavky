import { getIssueWithProject } from "../../src/utils/getIssueWithProject";
import { testData } from "../testData";

const project = testData.projects[0];

test("should get issue with project", () => {
  const result = getIssueWithProject(
    testData,
    project.owner,
    project.repo,
    project.issues[0].number,
  );
  expect(result).toMatchSnapshot();
});

test("should not get issue with project if there is no existing owner", () => {
  const result = getIssueWithProject(
    testData,
    "",
    project.repo,
    project.issues[0].number,
  );
  expect(result).toBeUndefined();
});

test("should not get issue with project if there is no existing repo", () => {
  const result = getIssueWithProject(
    testData,
    project.owner,
    "",
    project.issues[0].number,
  );
  expect(result).toBeUndefined();
});

test("should not get issue with project if there is no existing issue number", () => {
  const result = getIssueWithProject(testData, project.owner, project.repo, 99);
  expect(result).toBeUndefined();
});
