import { octokit } from "./octokit";

import { Project } from "./interfaces/Project";

export async function getProjectVisibility(project: Project): Promise<boolean> {
  const rawResponse = await octokit.rest.repos.get({ ...project });
  return !rawResponse.data.private;
}
