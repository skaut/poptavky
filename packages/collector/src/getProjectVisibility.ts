import type { Project } from "./interfaces/Project";

import { VisibilityError } from "../src/exceptions/VisibilityError";
import { octokit } from "./octokit";

export async function getProjectVisibility(project: Project): Promise<boolean> {
  const rawResponse = await octokit.rest.repos
    .get({ ...project })
    .catch((e: unknown): never => {
      throw new VisibilityError(String(e));
    });
  return !rawResponse.data.private;
}
