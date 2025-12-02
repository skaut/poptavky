import { expect, test } from "vitest";

import { PoptavkyError } from "../../src/exceptions/PoptavkyError.ts";
import { assertIsProject } from "../../src/interfaces/Project.ts";

test("Project recognizes valid project", () => {
  const project = { owner: "OWNER1", repo: "REPO1" };

  expect(() => {
    assertIsProject(project);
  }).not.toThrowError();
});

test("Project requires object input", () => {
  const project = false;

  expect(() => {
    assertIsProject(project);
  }).toThrowError(PoptavkyError);
});

test("Project cannot be null", () => {
  const project = null;

  expect(() => {
    assertIsProject(project);
  }).toThrowError(PoptavkyError);
});

test("Project requires the owner field", () => {
  const project = { repo: "REPO1" };

  expect(() => {
    assertIsProject(project);
  }).toThrowError(PoptavkyError);
});

test("Project requires the repo field", () => {
  const project = { owner: "OWNER1" };

  expect(() => {
    assertIsProject(project);
  }).toThrowError(PoptavkyError);
});

test("Project requires the owner field to be a string", () => {
  const project = { owner: 42, repo: "REPO1" };

  expect(() => {
    assertIsProject(project);
  }).toThrowError(PoptavkyError);
});

test("Project requires the repo field to be a string", () => {
  const project = { owner: "OWNER1", repo: 42 };

  expect(() => {
    assertIsProject(project);
  }).toThrowError(PoptavkyError);
});

test("Project uses custom errors", () => {
  const project = {};

  expect(() => {
    assertIsProject(project, () => {
      throw new Error("My error");
    });
  }).toThrowError("My error");
});
