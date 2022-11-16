import { PoptavkyError } from "../exceptions/PoptavkyError";

export interface Project {
  owner: string;
  repo: string;
}

export function assertIsProject(
  project: unknown,
  errorFn = (e: string): PoptavkyError => new PoptavkyError(e)
): asserts project is Project {
  if (typeof project !== "object" || project === null) {
    throw errorFn("The project isn't a valid object.");
  }
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
