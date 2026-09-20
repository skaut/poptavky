import { PoptavkyError } from "./PoptavkyError.ts";

export class VisibilityError extends PoptavkyError {
  public constructor(e: string) {
    super(`Couldn't get the repository visibility. Error message: ${e}`);
  }
}
