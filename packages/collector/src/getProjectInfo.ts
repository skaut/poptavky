import type { Project } from "./interfaces/Project";

import { ProjectInfoError } from "./exceptions/ProjectInfoError";
import {
  assertIsProjectInfo,
  type ProjectInfo,
} from "./interfaces/ProjectInfo";
import { octokit } from "./octokit";

export async function getProjectInfo(project: Project): Promise<ProjectInfo> {
  const rawResponse = await octokit.rest.repos
    .getContent({
      owner: project.owner,
      repo: project.repo,
      path: ".project-info.json",
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
