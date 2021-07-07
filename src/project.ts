import { ProjectListing } from "./ProjectListing";
import { octokit } from "./octokit";

import { ConfigNotFoundError } from "./exceptions/ConfigNotFoundError";

export async function getProjectListing(
  owner: string,
  repo: string
): Promise<ProjectListing | undefined> {
  console.log(await octokit.rest.repos.get({ owner, repo }));
  // TODO: No undefined
  const config = await octokit.rest.repos
    .getContent({
      owner,
      repo,
      path: ".poptavky.json",
    })
    .catch(function (e): never {
      throw new ConfigNotFoundError(String(e));
    });
  console.log(config);
  return undefined;
}
