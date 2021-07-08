import { octokit } from "./octokit";

import {
  ProjectConfig,
  assertIsProjectConfig,
} from "./interfaces/ProjectConfig";
import { Repo } from "./interfaces/Repo";

import { ProjectConfigError } from "./exceptions/ProjectConfigError";

export async function getProjectConfig(repo: Repo): Promise<ProjectConfig> {
  const rawResponse = await octokit.rest.repos
    .getContent({
      owner: repo.owner,
      repo: repo.repo,
      path: ".poptavky.json",
    })
    .catch(function (e): never {
      throw new ProjectConfigError(String(e));
    });
  const encodedContent = (rawResponse.data as { content?: string }).content;
  if (!encodedContent) {
    throw new ProjectConfigError("Failed to decode the file.");
  }
  let config: any = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config = JSON.parse(Buffer.from(encodedContent, "base64").toString());
  } catch (e) {
    throw new ProjectConfigError((e as SyntaxError).message);
  }
  assertIsProjectConfig(config);
  return config;
}
