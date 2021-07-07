import { ProjectConfig } from "./ProjectConfig";
import { octokit } from "./octokit";

import { ConfigError } from "./exceptions/ConfigError";

export async function getProjectConfig(
  owner: string,
  repo: string
): Promise<ProjectConfig> {
  const rawResponse = await octokit.rest.repos
    .getContent({
      owner,
      repo,
      path: ".poptavky.json",
    })
    .catch(function (e): never {
      throw new ConfigError(String(e));
    });
  const encodedContent = (rawResponse.data as { content?: string }).content;
  if (!encodedContent) {
    throw new ConfigError("Failed to decode the file.");
  }
  let config: any = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config = JSON.parse(Buffer.from(encodedContent, "base64").toString());
  } catch (e) {
    throw new ConfigError((e as SyntaxError).message);
  }
  // TODO: Strong type check with a type guard
  return config as ProjectConfig;
}
