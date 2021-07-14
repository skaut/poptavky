import * as fs from "fs";

import { GlobalConfig, assertIsGlobalConfig } from "./interfaces/GlobalConfig";

import { GlobalConfigError } from "./exceptions/GlobalConfigError";

export function getGlobalConfig(): GlobalConfig {
  let rawContents = "";
  try {
    rawContents = fs.readFileSync("config.json", "utf8");
  } catch (e) {
    throw new GlobalConfigError(e);
  }
  const contents = JSON.parse(rawContents); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  assertIsGlobalConfig(contents);
  return contents;
}
