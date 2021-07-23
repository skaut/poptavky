import { getGlobalConfig } from "../src/getGlobalConfig";

test("getGlobalConfig loads a file", () => {
  expect(getGlobalConfig()).toStrictEqual({
    projects: [{ owner: "skaut", repo: "poptavky-test" }],
  });
});
