import { PoptavkyError } from "./PoptavkyError.ts";

export class IssueListError extends PoptavkyError {
  public constructor(e: string) {
    super(`Couldn't list issues. Error message: ${e}`);
  }
}
