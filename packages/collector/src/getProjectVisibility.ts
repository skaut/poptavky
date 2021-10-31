import { octokit } from "./octokit";

import { VisibilityError } from "../src/exceptions/VisibilityError";

import type { Project } from "./interfaces/Project";

export async function getProjectVisibility(project: Project): Promise<boolean> {
  const rawResponse = await octokit.rest.repos
    .get({ ...project })
    .catch((e): never => {
      throw new VisibilityError(String(e));
    });
  return !rawResponse.data.private;
}
