import { PoptavkyError } from "../exceptions/PoptavkyError";

export interface Project {
  owner: string;
  repo: string;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function assertIsProject(
  project: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  errorFn = (e: string) => new PoptavkyError(e)
): asserts project is Project {
  if (!("owner" in project)) {
    throw errorFn('The project doesn\'t contain the required field "owner".');
  }
  if (!("repo" in project)) {
    throw errorFn('The project doesn\'t contain the required field "repo".');
  }
  if (typeof project.owner !== "string") {
    throw errorFn('The field "owner" is not a string.');
  }
  if (typeof project.repo !== "string") {
    throw errorFn('The field "repo" is not a string.');
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
