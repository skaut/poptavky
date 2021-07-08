import * as fs from "fs";

import { getGlobalConfig } from "./getGlobalConfig";
import { getProjectListing } from "./getProjectListing";

import { ProjectListing } from "./interfaces/ProjectListing";

import { PoptavkyError } from "./exceptions/PoptavkyError";

async function run() {
  try {
    const listings: Array<ProjectListing> = [];
    const globalConfig = getGlobalConfig();
    for (const project of globalConfig.projects) {
      listings.push(await getProjectListing(project));
    }
    fs.writeFileSync("listings.json", JSON.stringify(listings));
  } catch (e) {
    // TODO: Handle project errors gracefully
    console.error((e as PoptavkyError).message);
    process.exit(1);
  }
}

void run();
