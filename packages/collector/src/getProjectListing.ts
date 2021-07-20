import { getProjectInfo } from "./getProjectInfo";
import { getProjectIssues } from "./getProjectIssues";

import { Project } from "./interfaces/Project";
import { ProjectListing } from "./interfaces/ProjectListing";

export async function getProjectListing(
  project: Project
): Promise<ProjectListing> {
  const info = await getProjectInfo(project);
  return {
    ...project,
    info,
    issues: await getProjectIssues(project, info["help-issue-label"]),
  };
}
