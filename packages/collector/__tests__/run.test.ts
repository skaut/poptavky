import * as fs from "fs";
import * as core from "@actions/core";
import { mocked } from "ts-jest/utils";

import { run } from "../src/run";

import { getGlobalConfig } from "../src/getGlobalConfig";
import { getProjectListing } from "../src/getProjectListing";

import { ProjectInfo } from "../src/interfaces/ProjectInfo";

jest.mock("fs");
jest.mock("@actions/core");
jest.mock("../src/getGlobalConfig");
jest.mock("../src/getProjectListing");

const globalConfig0 = { projects: [{ owner: "OWNER", repo: "REPO0" }] };
const listing0 = Object.assign({}, globalConfig0.projects[0], {
  info: {
    name: "NAME0",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  } as ProjectInfo,
  issues: [
    { title: "1_TITLE", description: "1_DESCRIPTION" },
    { title: "2_TITLE", description: "2_DESCRIPTION" },
  ],
});

const globalConfig1 = {
  projects: [
    { owner: "OWNER", repo: "REPO0" },
    { owner: "OWNER", repo: "REPO1" },
  ],
};
const listing1 = Object.assign({}, globalConfig1.projects[1], {
  info: {
    name: "NAME1",
    "short-description": "DESC",
    description: "DESCRIPTION",
    maintainers: [{ name: "MAINTAINER" }],
    links: [{ type: "email", uri: "mailto:test@example.test" }],
  } as ProjectInfo,
  issues: [],
});

// TODO: Deduplicate with beforeEach
test("run works", async () => {
  mocked(getGlobalConfig).mockReturnValue(globalConfig0);
  mocked(getProjectListing).mockResolvedValue(listing0);
  mocked(fs).writeFileSync.mockReturnValue(undefined);
  mocked(core).error.mockReturnValue(undefined);
  mocked(core).setFailed.mockReturnValue(undefined);
  await run();
  expect(mocked(getProjectListing).mock.calls.length).toBe(
    globalConfig0.projects.length
  );
  expect(mocked(getProjectListing).mock.calls[0][0]).toStrictEqual(
    globalConfig0.projects[0]
  );
  expect(mocked(fs).writeFileSync.mock.calls.length).toBe(1);
  expect(mocked(fs).writeFileSync.mock.calls[0][0]).toBe("listings.json");
  expect(mocked(fs).writeFileSync.mock.calls[0][1]).toBe(
    JSON.stringify({ projects: [listing0] })
  );
  expect(mocked(core).error.mock.calls.length).toBe(0);
  expect(mocked(core).setFailed.mock.calls.length).toBe(0);
});

test("run works with multiple repos", async () => {
  mocked(getGlobalConfig).mockReturnValue(globalConfig1);
  mocked(getProjectListing).mockResolvedValueOnce(listing0);
  mocked(getProjectListing).mockResolvedValueOnce(listing1);
  mocked(fs).writeFileSync.mockReturnValue(undefined);
  mocked(core).error.mockReturnValue(undefined);
  mocked(core).setFailed.mockReturnValue(undefined);
  await run();
  expect(mocked(getProjectListing).mock.calls.length).toBe(
    globalConfig1.projects.length
  );
  expect(mocked(getProjectListing).mock.calls[0][0]).toStrictEqual(
    globalConfig1.projects[0]
  );
  expect(mocked(getProjectListing).mock.calls[1][0]).toStrictEqual(
    globalConfig1.projects[1]
  );
  expect(mocked(fs).writeFileSync.mock.calls.length).toBe(1);
  expect(mocked(fs).writeFileSync.mock.calls[0][0]).toBe("listings.json");
  expect(mocked(fs).writeFileSync.mock.calls[0][1]).toBe(
    JSON.stringify({ projects: [listing0, listing1] })
  );
  expect(mocked(core).error.mock.calls.length).toBe(0);
  expect(mocked(core).setFailed.mock.calls.length).toBe(0);
});
