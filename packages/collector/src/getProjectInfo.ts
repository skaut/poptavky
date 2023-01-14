import { ProjectInfoError } from "./exceptions/ProjectInfoError";
import type { Project } from "./interfaces/Project";
import type { ProjectInfo } from "./interfaces/ProjectInfo";
import { assertIsProjectInfo } from "./interfaces/ProjectInfo";
import { octokit } from "./octokit";

export async function getProjectInfo(project: Project): Promise<ProjectInfo> {
  const rawResponse = await octokit.rest.repos
    .getContent({
      owner: project.owner,
      repo: project.repo,
      path: ".project-info.json",
    })
    .catch(function (e): never {
      throw new ProjectInfoError(String(e));
    });
  const encodedContent = (rawResponse.data as { content?: string }).content;
  if (encodedContent === undefined) {
    throw new ProjectInfoError("Failed to decode the file.");
  }
  let info: unknown = undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    info = JSON.parse(Buffer.from(encodedContent, "base64").toString());
  } catch (e) {
    throw new ProjectInfoError((e as SyntaxError).message);
  }
  assertIsProjectInfo(info);
  return info;
}
