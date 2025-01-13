import type { Project } from "./interfaces/Project.ts";

import { VisibilityError } from "../src/exceptions/VisibilityError.ts";
import { octokit } from "./octokit.ts";

export async function getProjectVisibility(project: Project): Promise<boolean> {
  const rawResponse = await octokit.rest.repos
    .get({ ...project })
    .catch((e: unknown): never => {
      throw new VisibilityError(String(e));
    });
  return !rawResponse.data.private;
}
