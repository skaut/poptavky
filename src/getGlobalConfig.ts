import * as fs from "fs";

import { GlobalConfig } from "./interfaces/GlobalConfig";

export function getGlobalConfig(): GlobalConfig {
  return JSON.parse(fs.readFileSync("config.json", "utf8")) as GlobalConfig; // TODO: Handle errors in file read.
}
