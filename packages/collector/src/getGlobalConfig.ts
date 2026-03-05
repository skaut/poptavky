import * as fs from "fs";

import { GlobalConfigError } from "./exceptions/GlobalConfigError.ts";
import {
  assertIsGlobalConfig,
  type GlobalConfig,
} from "./interfaces/GlobalConfig.ts";

export function getGlobalConfig(): GlobalConfig {
  // eslint-disable-next-line no-useless-assignment -- no way to assign in the try block directly
  let contents = undefined;
  try {
    const rawContents = fs.readFileSync("../../config.json", "utf8");
    contents = JSON.parse(rawContents) as unknown;
  } catch (e) {
    throw new GlobalConfigError(String(e));
  }
  assertIsGlobalConfig(contents);
  return contents;
}
