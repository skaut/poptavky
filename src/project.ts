import { ProjectListing } from "./ProjectListing";
import { octokit } from "./octokit";

export function getProjectListing(
  owner: string,
  repo: string
): ProjectListing | undefined {
  // TODO: No undefined
  const config = octokit.rest.repos.getContent({
    owner,
    repo,
    path: ".poptavky.json",
  });
  console.log(config);
  return undefined;
}
