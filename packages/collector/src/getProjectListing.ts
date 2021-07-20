import { getProjectInfo } from "./getProjectInfo";
import { getProjectIssues } from "./getProjectIssues";
import { getProjectVisibility } from "./getProjectVisibility";

import { Project } from "./interfaces/Project";
import { ProjectListing } from "./interfaces/ProjectListing";

export async function getProjectListing(
  project: Project
): Promise<ProjectListing> {
  const info = await getProjectInfo(project);
  const publicRepo = await getProjectVisibility(project);
  return {
    ...project,
    info,
    issues: await getProjectIssues(
      project,
      publicRepo,
      info["help-issue-label"]
    ),
  };
}
