import * as fs from "fs";

interface GlobalConfig {
  projects: Array<string>;
}

export const globalConfig = JSON.parse(
  fs.readFileSync("config.json", "utf8") // TODO: Handle errors.
) as GlobalConfig;
