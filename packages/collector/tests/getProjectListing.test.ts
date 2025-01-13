import { expect, test, vi } from "vitest";

import type { ProjectInfo } from "../src/interfaces/ProjectInfo.ts";

import { getProjectInfo } from "../src/getProjectInfo.ts";
import { getProjectIssues } from "../src/getProjectIssues.ts";
import { getProjectListing } from "../src/getProjectListing.ts";
import { getProjectVisibility } from "../src/getProjectVisibility.ts";

vi.mock("../src/getProjectInfo");
vi.mock("../src/getProjectIssues");
vi.mock("../src/getProjectVisibility");

const project = { owner: "OWNER", repo: "REPO" };
const info: ProjectInfo = {
  description: "DESCRIPTION",
  links: [{ type: "email", uri: "mailto:test@example.test" }],
  maintainers: [{ name: "MAINTAINER" }],
  name: "NAME",
  "short-description": "DESC",
};
const issues = [
  { description: "1_DESCRIPTION", number: 1, title: "1_TITLE" },
  { description: "2_DESCRIPTION", number: 2, title: "2_TITLE" },
];

test("getProjectListing gets a value", async () => {
  expect.assertions(9);

  vi.mocked(getProjectInfo).mockResolvedValue(info);
  vi.mocked(getProjectIssues).mockResolvedValue(issues);
  vi.mocked(getProjectVisibility).mockResolvedValue(true);

  await expect(getProjectListing(project)).resolves.toStrictEqual({
    ...project,
    info,
    issues,
  });
  expect(vi.mocked(getProjectInfo).mock.calls).toHaveLength(1);
  expect(vi.mocked(getProjectInfo).mock.calls[0][0]).toStrictEqual(project);
  expect(vi.mocked(getProjectVisibility).mock.calls).toHaveLength(1);
  expect(vi.mocked(getProjectVisibility).mock.calls[0][0]).toStrictEqual(
    project,
  );
  expect(vi.mocked(getProjectIssues).mock.calls).toHaveLength(1);
  expect(vi.mocked(getProjectIssues).mock.calls[0][0]).toStrictEqual(project);
  expect(vi.mocked(getProjectIssues).mock.calls[0][1]).toBe(true);
  expect(vi.mocked(getProjectIssues).mock.calls[0][2]).toStrictEqual(
    info["help-issue-label"],
  );
});
