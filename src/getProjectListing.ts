import { getProjectConfig } from "./getProjectConfig";
import { getProjectIssues } from "./getProjectIssues";

import { Project } from "./interfaces/Project";
import { ProjectListing } from "./interfaces/ProjectListing";

export async function getProjectListing(
  project: Project
): Promise<ProjectListing> {
  const config = await getProjectConfig(project);
  const listing = {
    ...config,
    issues: await getProjectIssues(project, config["issue-label"]),
  };
  return listing;
}
