import * as fs from "fs";

interface GlobalConfig {
  projects: Array<string>;
}

const globalConfig = JSON.parse(
  fs.readFileSync("config.json", "utf8")
) as GlobalConfig; // TODO: Handle errors.

export default globalConfig;
