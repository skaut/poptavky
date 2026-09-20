import * as core from "@actions/core";
import * as fs from "fs";
import { beforeEach, expect, test, vi } from "vitest";

import type { ProjectInfo } from "../src/interfaces/ProjectInfo.ts";

import { getGlobalConfig } from "../src/getGlobalConfig.ts";
import { getProjectListing } from "../src/getProjectListing.ts";
import { run } from "../src/run.ts";

vi.mock("fs");
vi.mock("@actions/core");
vi.mock("../src/getGlobalConfig");
vi.mock("../src/getProjectListing");

const globalConfig0 = { projects: [{ owner: "OWNER", repo: "REPO0" }] };
const listing0 = {
  ...globalConfig0.projects[0],
  info: {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME0",
    "short-description": "DESC",
  } as ProjectInfo,
  issues: [
    { description: "1_DESCRIPTION", number: 1, title: "1_TITLE" },
    { description: "2_DESCRIPTION", number: 2, title: "2_TITLE" },
  ],
};

const globalConfig1 = {
  projects: [
    { owner: "OWNER", repo: "REPO0" },
    { owner: "OWNER", repo: "REPO1" },
  ],
};
const listing1 = {
  ...globalConfig1.projects[1],
  info: {
    description: "DESCRIPTION",
    links: [{ type: "email", uri: "mailto:test@example.test" }],
    maintainers: [{ name: "MAINTAINER" }],
    name: "NAME1",
    "short-description": "DESC",
  } as ProjectInfo,
  issues: [],
};

beforeEach(() => {
  vi.mocked(fs).writeFileSync.mockReturnValue(undefined);
  vi.mocked(core).error.mockReturnValue(undefined);
  vi.mocked(core).setFailed.mockReturnValue(undefined);
});

test("run works", async () => {
  expect.assertions(7);

  vi.mocked(getGlobalConfig).mockReturnValue(globalConfig0);
  vi.mocked(getProjectListing).mockResolvedValue(listing0);
  await run();

  expect(vi.mocked(getProjectListing).mock.calls).toHaveLength(
    globalConfig0.projects.length,
  );
  expect(vi.mocked(getProjectListing).mock.calls[0][0]).toStrictEqual(
    globalConfig0.projects[0],
  );
  expect(vi.mocked(fs).writeFileSync.mock.calls).toHaveLength(1);
  expect(vi.mocked(fs).writeFileSync.mock.calls[0][0]).toBe(
    "../../listings.json",
  );
  expect(vi.mocked(fs).writeFileSync.mock.calls[0][1]).toBe(
    JSON.stringify({ projects: [listing0] }),
  );
  expect(vi.mocked(core).error.mock.calls).toHaveLength(0);
  expect(vi.mocked(core).setFailed.mock.calls).toHaveLength(0);
});

test("run works with multiple repos", async () => {
  expect.assertions(8);

  vi.mocked(getGlobalConfig).mockReturnValue(globalConfig1);
  vi.mocked(getProjectListing).mockResolvedValueOnce(listing0);
  vi.mocked(getProjectListing).mockResolvedValueOnce(listing1);
  await run();

  expect(vi.mocked(getProjectListing).mock.calls).toHaveLength(
    globalConfig1.projects.length,
  );
  expect(vi.mocked(getProjectListing).mock.calls[0][0]).toStrictEqual(
    globalConfig1.projects[0],
  );
  expect(vi.mocked(getProjectListing).mock.calls[1][0]).toStrictEqual(
    globalConfig1.projects[1],
  );
  expect(vi.mocked(fs).writeFileSync.mock.calls).toHaveLength(1);
  expect(vi.mocked(fs).writeFileSync.mock.calls[0][0]).toBe(
    "../../listings.json",
  );
  expect(vi.mocked(fs).writeFileSync.mock.calls[0][1]).toBe(
    JSON.stringify({ projects: [listing0, listing1] }),
  );
  expect(vi.mocked(core).error.mock.calls).toHaveLength(0);
  expect(vi.mocked(core).setFailed.mock.calls).toHaveLength(0);
});

test("run handles global error gracefully", async () => {
  expect.assertions(3);

  vi.mocked(getGlobalConfig).mockImplementation(() => {
    throw new Error();
  });
  vi.mocked(getProjectListing).mockResolvedValueOnce(listing0);
  vi.mocked(getProjectListing).mockResolvedValueOnce(listing1);
  await run();

  expect(vi.mocked(fs).writeFileSync.mock.calls).toHaveLength(0);
  expect(vi.mocked(core).error.mock.calls).toHaveLength(0);
  expect(vi.mocked(core).setFailed.mock.calls).toHaveLength(1);
});

test("run handes local error gracefully", async () => {
  expect.assertions(8);

  vi.mocked(getGlobalConfig).mockReturnValue(globalConfig1);
  vi.mocked(getProjectListing).mockRejectedValueOnce(new Error());
  vi.mocked(getProjectListing).mockResolvedValueOnce(listing1);
  await run();

  expect(vi.mocked(getProjectListing).mock.calls).toHaveLength(
    globalConfig1.projects.length,
  );
  expect(vi.mocked(getProjectListing).mock.calls[0][0]).toStrictEqual(
    globalConfig1.projects[0],
  );
  expect(vi.mocked(getProjectListing).mock.calls[1][0]).toStrictEqual(
    globalConfig1.projects[1],
  );
  expect(vi.mocked(fs).writeFileSync.mock.calls).toHaveLength(1);
  expect(vi.mocked(fs).writeFileSync.mock.calls[0][0]).toBe(
    "../../listings.json",
  );
  expect(vi.mocked(fs).writeFileSync.mock.calls[0][1]).toBe(
    JSON.stringify({ projects: [listing1] }),
  );
  expect(vi.mocked(core).error.mock.calls).toHaveLength(1);
  expect(vi.mocked(core).setFailed.mock.calls).toHaveLength(0);
});
