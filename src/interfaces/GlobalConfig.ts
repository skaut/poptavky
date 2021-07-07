import { Repo, assertIsRepo } from "./Repo";

import { GlobalConfigError } from "../exceptions/GlobalConfigError";

export interface GlobalConfig {
  projects: Array<Repo>;
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
    assertIsRepo(project, (e) =>
      errorFn('A "project" field item is invalid: ' + e)
    );
  }
}
/* eslint-enbale @typescript-eslint/no-unsafe-member-access */
