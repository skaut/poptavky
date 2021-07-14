import { PoptavkyError } from "./PoptavkyError";

export class ProjectConfigError extends PoptavkyError {
  public constructor(e: string) {
    super(
      'Couldn\'t read the project config file ".poptavky.json". Error message: ' +
        e
    );
  }
}
