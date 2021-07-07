import * as fs from "fs";

interface GlobalConfigProject {
  owner: string;
  repo: string;
}

interface GlobalConfig {
  projects: Array<GlobalConfigProject>;
}

export function getGlobalConfig(): GlobalConfig {
  return JSON.parse(fs.readFileSync("config.json", "utf8")) as GlobalConfig; // TODO: Handle errors in file read.
}
