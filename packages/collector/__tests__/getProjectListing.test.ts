import { mocked } from "ts-jest/utils";

import { getProjectListing } from "../src/getProjectListing";

import { getProjectInfo } from "../src/getProjectInfo";
import { getProjectIssues } from "../src/getProjectIssues";
import { getProjectVisibility } from "../src/getProjectVisibility";

import { ProjectInfo } from "../src/interfaces/ProjectInfo";

jest.mock("../src/getProjectInfo");
jest.mock("../src/getProjectIssues");
jest.mock("../src/getProjectVisibility");

const project = { owner: "OWNER", repo: "REPO" };
const info: ProjectInfo = {
  name: "NAME",
  "short-description": "DESC",
  description: "DESCRIPTION",
  maintainers: [{ name: "MAINTAINER" }],
  links: [{ type: "email", uri: "mailto:test@example.test" }],
};
const issues = [
  { title: "1_TITLE", description: "1_DESCRIPTION" },
  { title: "2_TITLE", description: "2_DESCRIPTION" },
];

test("getProjectListing gets a value", async () => {
  mocked(getProjectInfo).mockResolvedValue(info);
  mocked(getProjectIssues).mockResolvedValue(issues);
  mocked(getProjectVisibility).mockResolvedValue(true);
  await expect(getProjectListing(project)).resolves.toStrictEqual(
    Object.assign({}, project, { info, issues })
  );
  expect(mocked(getProjectInfo).mock.calls.length).toBe(1);
  expect(mocked(getProjectInfo).mock.calls[0][0]).toStrictEqual(project);
  expect(mocked(getProjectVisibility).mock.calls.length).toBe(1);
  expect(mocked(getProjectVisibility).mock.calls[0][0]).toStrictEqual(project);
  expect(mocked(getProjectIssues).mock.calls.length).toBe(1);
  expect(mocked(getProjectIssues).mock.calls[0][0]).toStrictEqual(project);
  expect(mocked(getProjectIssues).mock.calls[0][1]).toBe(true);
  expect(mocked(getProjectIssues).mock.calls[0][2]).toEqual(
    info["help-issue-label"]
  );
});
