import { octokit } from "./octokit";

import { Project } from "./interfaces/Project";

import { VisibilityError } from "../src/exceptions/VisibilityError";

export async function getProjectVisibility(project: Project): Promise<boolean> {
  const rawResponse = await octokit.rest.repos
    .get({ ...project })
    .catch((e): never => {
      throw new VisibilityError(String(e));
    });
  return !rawResponse.data.private;
}
