import type { Project } from "./interfaces/Project.ts";
import type { ProjectListing } from "./interfaces/ProjectListing.ts";

import { getProjectInfo } from "./getProjectInfo.ts";
import { getProjectIssues } from "./getProjectIssues.ts";
import { getProjectVisibility } from "./getProjectVisibility.ts";

export async function getProjectListing(
  project: Project,
): Promise<ProjectListing> {
  const info = await getProjectInfo(project);
  const publicRepo = await getProjectVisibility(project);
  return {
    ...project,
    info,
    issues: await getProjectIssues(
      project,
      publicRepo,
      info["help-issue-label"],
    ),
  };
}
