import { PoptavkyError } from "./PoptavkyError";

import { Repo } from "../interfaces/Repo";

export class ProjectConfigError extends PoptavkyError {
  public constructor(repo: Repo, e: string) {
    super(
      'Couldn\'t read the config file ".poptavky.json" for the repository ' +
        repo.owner +
        "/" +
        repo.repo +
        ". Error message: " +
        e
    );
  }
}
