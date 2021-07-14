import { PoptavkyError } from "./PoptavkyError";

export class GlobalConfigError extends PoptavkyError {
  public constructor(e: string) {
    super(
      'Couldn\'t read the global config file "config.json". Error message: ' + e
    );
  }
}
