import { globalConfig } from "./globalConfig";
import { ProjectListing } from "./ProjectListing";
import { getProjectListing } from "./project";

import { PoptavkyError } from "./exceptions/PoptavkyError";

async function run() {
  try {
    const listings: Array<ProjectListing | undefined> = []; // TODO: Remove undefined
    for (const project of globalConfig.projects) {
      listings.push(await getProjectListing(project.owner, project.repo));
    }
  } catch (e) {
    console.error((e as PoptavkyError).message);
    process.exit(1);
  }
}

void run();
