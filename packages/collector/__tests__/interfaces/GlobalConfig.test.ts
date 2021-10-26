import { assertIsGlobalConfig } from "../../src/interfaces/GlobalConfig";

import { GlobalConfigError } from "../../src/exceptions/GlobalConfigError";

test("GlobalConfig recognizes valid config", () => {
  const config = { projects: [] };
  expect(() => {
    assertIsGlobalConfig(config);
  }).not.toThrow();
});

test("GlobalConfig requires object input", () => {
  const config = false;
  expect(() => {
    assertIsGlobalConfig(config);
  }).toThrow(GlobalConfigError);
});

test("GlobalConfig cannot be null", () => {
  const config = null;
  expect(() => {
    assertIsGlobalConfig(config);
  }).toThrow(GlobalConfigError);
});

test("GlobalConfig requires the projects field", () => {
  const config = {};
  expect(() => {
    assertIsGlobalConfig(config);
  }).toThrow(GlobalConfigError);
});

test("GlobalConfig requires the projects field to be an array", () => {
  const config = { projects: "" };
  expect(() => {
    assertIsGlobalConfig(config);
  }).toThrow(GlobalConfigError);
});

test("GlobalConfig requires the projects field to be an array", () => {
  const config = { projects: [{}] };
  expect(() => {
    assertIsGlobalConfig(config);
  }).toThrow(GlobalConfigError);
});

test("GlobalConfig uses custom errors", () => {
  const config = { projects: "" };
  expect(() => {
    assertIsGlobalConfig(config, () => {
      throw new Error("My error");
    });
  }).toThrow("My error");
});
