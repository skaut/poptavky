import * as fs from "fs";

interface GlobalConfigProject {
  owner: string;
  repo: string;
}

interface GlobalConfig {
  projects: Array<GlobalConfigProject>;
}

export const globalConfig = JSON.parse(
  fs.readFileSync("config.json", "utf8") // TODO: Handle errors in file read.
) as GlobalConfig; // TODO: Handle parsing errors/invalid config.
