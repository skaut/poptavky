import * as fs from "fs";
import { mocked } from "ts-jest/utils";

import { getGlobalConfig } from "../src/getGlobalConfig";

jest.mock("fs");

test("getGlobalConfig loads a file", () => {
  mocked(fs).readFileSync.mockReturnValue('{"projects": []}');
  expect(getGlobalConfig()).toStrictEqual({
    projects: [{ owner: "skaut", repo: "poptavky-test" }],
  });
});
