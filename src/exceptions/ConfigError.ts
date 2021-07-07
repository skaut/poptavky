import { PoptavkyError } from "./PoptavkyError";

export class ConfigError extends PoptavkyError {
  public constructor(e: string) {
    super(
      'Couldn\'t get the config file ".poptavky.json". Error message: ' + e
    );
  }
}
