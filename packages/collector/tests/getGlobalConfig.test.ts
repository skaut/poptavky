import * as fs from "fs";
import { expect, test, vi } from "vitest";

import { GlobalConfigError } from "../src/exceptions/GlobalConfigError.ts";
import { getGlobalConfig } from "../src/getGlobalConfig.ts";

vi.mock("fs");

test("getGlobalConfig loads a file", () => {
  vi.mocked(fs).readFileSync.mockReturnValue('{"projects": []}');

  expect(getGlobalConfig()).toStrictEqual({
    projects: [],
  });
});

test("getGlobalConfig reads a file", () => {
  vi.mocked(fs).readFileSync.mockReturnValue(
    '{"projects": [{"owner": "OWNER1", "repo": "REPO1"}, {"owner": "OWNER2", "repo": "REPO2"}]}',
  );

  expect(getGlobalConfig()).toStrictEqual({
    projects: [
      { owner: "OWNER1", repo: "REPO1" },
      { owner: "OWNER2", repo: "REPO2" },
    ],
  });
});

test("getGlobalConfig fails gracefully on file read error", () => {
  vi.mocked(fs).readFileSync.mockImplementation(() => {
    throw new Error();
  });

  expect(() => getGlobalConfig()).toThrow(GlobalConfigError);
});

test("getGlobalConfig fails gracefully on empty file", () => {
  vi.mocked(fs).readFileSync.mockReturnValue("");

  expect(() => getGlobalConfig()).toThrow(GlobalConfigError);
});
