import { PoptavkyError } from "./PoptavkyError";

export class ProjectInfoError extends PoptavkyError {
  public constructor(e: string) {
    super(
      'Couldn\'t read the project info file ".project-info.json". Error message: ' +
        e,
    );
  }
}
