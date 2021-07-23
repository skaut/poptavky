import * as fs from "fs";
import { mocked } from "ts-jest/utils";

import { getGlobalConfig } from "../src/getGlobalConfig";

import { GlobalConfigError } from "../src/exceptions/GlobalConfigError";

jest.mock("fs");

test("getGlobalConfig loads a file", () => {
  mocked(fs).readFileSync.mockReturnValue('{"projects": []}');
  expect(getGlobalConfig()).toStrictEqual({
    projects: [],
  });
});

test("getGlobalConfig reads a file", () => {
  mocked(fs).readFileSync.mockReturnValue(
    '{"projects": [{"owner": "OWNER1", "repo": "REPO1"}, {"owner": "OWNER2", "repo": "REPO2"}]}'
  );
  expect(getGlobalConfig()).toStrictEqual({
    projects: [
      { owner: "OWNER1", repo: "REPO1" },
      { owner: "OWNER2", repo: "REPO2" },
    ],
  });
});

test("getGlobalConfig fails gracefully on file read error", () => {
  mocked(fs).readFileSync.mockImplementation(() => {
    throw new Error();
  });
  expect(() => getGlobalConfig()).toThrow(GlobalConfigError);
});

test("getGlobalConfig fails gracefully on empty file", () => {
  mocked(fs).readFileSync.mockReturnValue("");
  expect(() => getGlobalConfig()).toThrow(GlobalConfigError);
});
