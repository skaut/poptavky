import { PoptavkyError } from "../exceptions/PoptavkyError";

export interface Repo {
  owner: string;
  repo: string;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function assertIsRepo(
  repo: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  errorFn = (e: string) => new PoptavkyError(e)
): asserts repo is Repo {
  if (!("owner" in repo)) {
    throw errorFn('The repo doesn\'t contain the required field "owner".');
  }
  if (!("repo" in repo)) {
    throw errorFn('The repo doesn\'t contain the required field "repo".');
  }
  if (typeof repo.owner !== "string") {
    throw errorFn('The field "owner" is not a string.');
  }
  if (typeof repo.repo !== "string") {
    throw errorFn('The field "repo" is not a string.');
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
