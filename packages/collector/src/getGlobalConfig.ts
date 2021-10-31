import * as fs from "fs";

import { assertIsGlobalConfig } from "./interfaces/GlobalConfig";

import type { GlobalConfig } from "./interfaces/GlobalConfig";

import { GlobalConfigError } from "./exceptions/GlobalConfigError";

export function getGlobalConfig(): GlobalConfig {
  let contents = "";
  try {
    const rawContents = fs.readFileSync("config.json", "utf8");
    contents = JSON.parse(rawContents); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  } catch (e) {
    throw new GlobalConfigError(String(e));
  }
  assertIsGlobalConfig(contents);
  return contents;
}
