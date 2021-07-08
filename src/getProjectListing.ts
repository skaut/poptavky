import { getProjectConfig } from "./getProjectConfig";
import { getProjectIssues } from "./getProjectIssues";

import { ProjectListing } from "./interfaces/ProjectListing";
import { Repo } from "./interfaces/Repo";

export async function getProjectListing(repo: Repo): Promise<ProjectListing> {
  const config = await getProjectConfig(repo);
  const listing = {
    ...config,
    issues: await getProjectIssues(repo, config["issue-label"]),
  };
  return listing;
}
