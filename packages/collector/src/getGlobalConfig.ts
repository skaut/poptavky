import * as fs from "fs";

import { GlobalConfigError } from "./exceptions/GlobalConfigError";
import type { GlobalConfig } from "./interfaces/GlobalConfig";
import { assertIsGlobalConfig } from "./interfaces/GlobalConfig";

export function getGlobalConfig(): GlobalConfig {
  let contents = "";
  try {
    const rawContents = fs.readFileSync("../../config.json", "utf8");
    contents = JSON.parse(rawContents); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  } catch (e) {
    throw new GlobalConfigError(String(e));
  }
  assertIsGlobalConfig(contents);
  return contents;
}
