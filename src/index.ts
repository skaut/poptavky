import { globalConfig } from "./globalConfig";
import { ProjectListing } from "./ProjectListing";
import { getProjectListing } from "./project";

async function run() {
  const listings: Array<ProjectListing | undefined> = []; // TODO: Remove undefined
  for (const project of globalConfig.projects) {
    listings.push(await getProjectListing(project.owner, project.repo));
  }
}

void run();
