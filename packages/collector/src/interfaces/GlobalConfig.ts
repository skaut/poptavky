import { Project, assertIsProject } from "./Project";

import { GlobalConfigError } from "../exceptions/GlobalConfigError";

export interface GlobalConfig {
  projects: Array<Project>;
}

export function assertIsGlobalConfig(
  config: unknown,
  errorFn = (e: string): GlobalConfigError => new GlobalConfigError(e)
): asserts config is GlobalConfig {
  if (typeof config !== "object" || config === null) {
    throw errorFn("The file doesn't contain a valid object.");
  }
  if (!("projects" in config)) {
    throw errorFn('The file doesn\'t contain the required field "projects".');
  }
  const configWithProps = config as { projects: unknown }; // microsoft/TypeScript#21732
  if (!Array.isArray(configWithProps.projects)) {
    throw errorFn('The field "projects" is not an array.');
  }
  for (const project of configWithProps.projects) {
    assertIsProject(project, (e) =>
      errorFn('A "project" field item is invalid: ' + e)
    );
  }
}
