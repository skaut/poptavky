import { globalConfig } from "./globalConfig";
import { ProjectListing } from "./ProjectListing";
import { getProjectListing } from "./project";

function run() {
  console.log("Sucess");
  console.log(globalConfig);
  const listings: Array<ProjectListing | undefined> = []; // TODO: Remove undefined
  for (const project of globalConfig.projects) {
    listings.push(getProjectListing(project));
  }
}

void run();
