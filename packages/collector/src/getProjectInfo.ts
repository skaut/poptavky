import { octokit } from "./octokit";

import { ProjectInfo, assertIsProjectInfo } from "./interfaces/ProjectInfo";
import { Project } from "./interfaces/Project";

import { ProjectInfoError } from "./exceptions/ProjectInfoError";

export async function getProjectInfo(project: Project): Promise<ProjectInfo> {
  const rawResponse = await octokit.rest.repos
    .getContent({
      owner: project.owner,
      repo: project.repo,
      path: ".project-info.json",
    })
    .catch((e): never => {
      throw new ProjectInfoError(String(e));
    });
  const encodedContent = (rawResponse.data as { content?: string }).content;
  if (!encodedContent) {
    throw new ProjectInfoError("Failed to decode the file.");
  }
  let info: any = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    info = JSON.parse(Buffer.from(encodedContent, "base64").toString());
  } catch (e) {
    throw new ProjectInfoError((e as SyntaxError).message);
  }
  assertIsProjectInfo(info);
  return info;
}
