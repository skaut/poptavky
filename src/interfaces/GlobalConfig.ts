import { Project, assertIsProject } from "./Project";

import { GlobalConfigError } from "../exceptions/GlobalConfigError";

export interface GlobalConfig {
  projects: Array<Project>;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function assertIsGlobalConfig(
  config: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  errorFn = (e: string) => new GlobalConfigError(e)
): asserts config is GlobalConfig {
  if (!("projects" in config)) {
    throw errorFn('The file doesn\'t contain the required field "projects".');
  }
  if (!Array.isArray(config.projects)) {
    throw errorFn('The field "projects" is not an array.');
  }
  for (const project of config.projects) {
    assertIsProject(project, (e) =>
      errorFn('A "project" field item is invalid: ' + e)
    );
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
