import { CustomError } from "ts-custom-error";

export class PoptavkyError extends CustomError {
  public constructor(e: string) {
    super(e);
  }
}
