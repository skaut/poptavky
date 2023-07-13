import { GlobalConfigError } from "../exceptions/GlobalConfigError";
import type { Project } from "./Project";
import { assertIsProject } from "./Project";

export interface GlobalConfig {
  projects: Array<Project>;
}

export function assertIsGlobalConfig(
  config: unknown,
  errorFn = (e: string): GlobalConfigError => new GlobalConfigError(e),
): asserts config is GlobalConfig {
  if (typeof config !== "object" || config === null) {
    throw errorFn("The file doesn't contain a valid object.");
  }
  if (!("projects" in config)) {
    throw errorFn('The file doesn\'t contain the required field "projects".');
  }
  if (!Array.isArray(config.projects)) {
    throw errorFn('The field "projects" is not an array.');
  }
  for (const project of config.projects) {
    assertIsProject(project, (e) =>
      errorFn('A "project" field item is invalid: ' + e),
    );
  }
}
