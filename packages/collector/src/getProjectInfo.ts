import type { Project } from "./interfaces/Project.ts";

import { ProjectInfoError } from "./exceptions/ProjectInfoError.ts";
import {
  assertIsProjectInfo,
  type ProjectInfo,
} from "./interfaces/ProjectInfo.ts";
import { octokit } from "./octokit.ts";

export async function getProjectInfo(project: Project): Promise<ProjectInfo> {
  const rawResponse = await octokit.rest.repos
    .getContent({
      owner: project.owner,
      path: ".project-info.json",
      repo: project.repo,
    })
    .catch((e: unknown): never => {
      throw new ProjectInfoError(String(e));
    });
  const encodedContent = (rawResponse.data as { content?: string }).content;
  if (encodedContent === undefined) {
    throw new ProjectInfoError("Failed to decode the file.");
  }
  let info: unknown = undefined;
  try {
    info = JSON.parse(Buffer.from(encodedContent, "base64").toString());
  } catch (e) {
    throw new ProjectInfoError((e as SyntaxError).message);
  }
  assertIsProjectInfo(info);
  return info;
}
