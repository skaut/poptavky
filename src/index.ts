import { getGlobalConfig } from "./getGlobalConfig";
import { ProjectListing } from "./ProjectListing";
import { getProjectListing } from "./getProjectListing";

import { PoptavkyError } from "./exceptions/PoptavkyError";

async function run() {
  try {
    const listings: Array<ProjectListing | undefined> = []; // TODO: Remove undefined
    const globalConfig = getGlobalConfig();
    for (const project of globalConfig.projects) {
      listings.push(await getProjectListing(project.owner, project.repo));
    }
  } catch (e) {
    console.error((e as PoptavkyError).message);
    process.exit(1);
  }
}

void run();
