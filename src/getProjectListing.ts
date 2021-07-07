import { getProjectConfig } from "./getProjectConfig";
import { ProjectListing } from "./ProjectListing";

export async function getProjectListing(
  owner: string,
  repo: string
): Promise<ProjectListing | undefined> {
  // TODO: No undefined
  const config = await getProjectConfig(owner, repo);
  console.log(config);
  return undefined;
}
